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
    
    // Simuler la génération de rapport (service Reports non disponible)
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        type: this.reportConfig.type,
        period: this.reportConfig.period,
        format: this.reportConfig.format,
        generatedAt: new Date(),
        generatedBy: 'Admin'
      };
      
      this.reports.unshift(newReport as any);
      this.generating = false;
      alert('Rapport généré avec succès (simulation)');
    }, 1000);
    
    /* Version avec API (quand service Reports sera disponible):
    this.reportService.generateReport(this.reportConfig).subscribe({
      next: (report) => {
        this.generating = false;
        this.loadReports();
        alert('Rapport généré avec succès');
      },
      error: (error) => {
        this.generating = false;
        console.error('Erreur génération rapport:', error);
        alert('Service Reports non disponible');
      }
    });
    */
  }

  downloadReport(id: number) {
    // Simulation de téléchargement (service Reports non disponible)
    const report = this.reports.find(r => r.id === id);
    if (!report) {
      alert('Rapport non trouvé');
      return;
    }
    
    // Créer un contenu PDF simulé
    const content = `
Rapport ${(report as any).type || 'N/A'}
Période: ${(report as any).period || 'N/A'}
Format: ${(report as any).format || 'PDF'}
Généré le: ${new Date((report as any).generatedAt || Date.now()).toLocaleString()}
Généré par: ${(report as any).generatedBy || 'Admin'}

Ce rapport a été généré avec succès.
(Simulation - Service Reports non disponible)
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rapport_${(report as any).type || 'report'}_${id}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    alert('Rapport téléchargé avec succès! (simulation)');
    
    /* Version avec API (quand service Reports sera disponible):
    this.reportService.downloadReport(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `report_${id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        alert('Service Reports non disponible');
      }
    });
    */
  }
}
