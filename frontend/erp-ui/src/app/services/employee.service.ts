import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, Leave, Attendance } from '../models/employee.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.apiUrl = this.config.getHRApiUrl();
  }

  // Employee CRUD
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/employees/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employees`, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/employees/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employees/${id}`);
  }

  // Leave Management
  getLeaves(employeeId?: number): Observable<Leave[]> {
    let params = new HttpParams();
    if (employeeId) {
      params = params.set('employeeId', employeeId.toString());
    }
    return this.http.get<Leave[]>(`${this.apiUrl}/leaves`, { params });
  }

  getLeave(id: number): Observable<Leave> {
    return this.http.get<Leave>(`${this.apiUrl}/leaves/${id}`);
  }

  createLeave(leave: Partial<Leave>): Observable<Leave> {
    return this.http.post<Leave>(`${this.apiUrl}/leaves`, leave);
  }

  updateLeaveStatus(id: number, status: string): Observable<Leave> {
    return this.http.patch<Leave>(`${this.apiUrl}/leaves/${id}/status`, { status });
  }

  // Attendance
  getAttendances(startDate?: Date, endDate?: Date, employeeId?: number): Observable<Attendance[]> {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    if (employeeId) {
      params = params.set('employeeId', employeeId.toString());
    }
    return this.http.get<Attendance[]>(`${this.apiUrl}/attendances`, { params });
  }

  createAttendance(attendance: Partial<Attendance>): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.apiUrl}/attendances`, attendance);
  }

  checkIn(employeeId: number): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.apiUrl}/attendances/check-in`, { employeeId });
  }

  checkOut(attendanceId: number): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.apiUrl}/attendances/${attendanceId}/check-out`, {});
  }
}
