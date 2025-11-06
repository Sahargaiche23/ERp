import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStats, Report, ReportConfig } from '../models/report.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.apiUrl = this.config.getReportsApiUrl();
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`);
  }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl);
  }

  generateReport(config: ReportConfig): Observable<Report> {
    return this.http.post<Report>(`${this.apiUrl}/generate`, config);
  }

  downloadReport(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/download`, {
      responseType: 'blob'
    });
  }

  getHRReport(period: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/hr`, { params: { period } });
  }

  getBudgetReport(year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/budget`, { params: { year: year.toString() } });
  }

  getClaimsReport(period: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/claims`, { params: { period } });
  }

  getProjectsReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/projects`);
  }
}
