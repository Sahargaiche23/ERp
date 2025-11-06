import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Report, ReportConfig } from '../models/report.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  loading = true;
  generating = false;
  
  reportConfig: ReportConfig = {
    type: 'HR',
    period: 'MONTHLY',
    format: 'PDF'
  };

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.reportService.getReports().subscribe({
      next: (data) => {
        this.reports = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  generateReport() {
    this.generating = true;
    this.reportService.generateReport(this.reportConfig).subscribe({
      next: () => {
        this.generating = false;
        this.loadReports();
        alert('Rapport généré avec succès');
      },
      error: () => {
        this.generating = false;
        alert('Erreur lors de la génération du rapport');
      }
    });
  }

  downloadReport(id: number) {
    this.reportService.downloadReport(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `report_${id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }
}
