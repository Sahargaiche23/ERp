import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget, BudgetLine, Project, Transaction } from '../models/budget.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.apiUrl = this.config.getBudgetApiUrl();
  }

  // Budget CRUD
  getBudgets(year?: number, department?: string): Observable<Budget[]> {
    let params = new HttpParams();
    if (year) {
      params = params.set('year', year.toString());
    }
    if (department) {
      params = params.set('department', department);
    }
    return this.http.get<Budget[]>(`${this.apiUrl}/budgets`, { params });
  }

  getBudget(id: number): Observable<Budget> {
    return this.http.get<Budget>(`${this.apiUrl}/budgets/${id}`);
  }

  createBudget(budget: Partial<Budget>): Observable<Budget> {
    return this.http.post<Budget>(`${this.apiUrl}/budgets`, budget);
  }

  updateBudget(id: number, budget: Partial<Budget>): Observable<Budget> {
    return this.http.put<Budget>(`${this.apiUrl}/budgets/${id}`, budget);
  }

  // Budget Lines
  getBudgetLines(budgetId: number): Observable<BudgetLine[]> {
    return this.http.get<BudgetLine[]>(`${this.apiUrl}/budgets/${budgetId}/lines`);
  }

  createBudgetLine(budgetId: number, line: Partial<BudgetLine>): Observable<BudgetLine> {
    return this.http.post<BudgetLine>(`${this.apiUrl}/budgets/${budgetId}/lines`, line);
  }

  // Projects
  getProjects(department?: string, status?: string): Observable<Project[]> {
    let params = new HttpParams();
    if (department) {
      params = params.set('department', department);
    }
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<Project[]>(`${this.apiUrl}/projects`, { params });
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`);
  }

  createProject(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project);
  }

  updateProject(id: number, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/projects/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${id}`);
  }

  // Transactions
  getTransactions(projectId?: number): Observable<Transaction[]> {
    let params = new HttpParams();
    if (projectId) {
      params = params.set('projectId', projectId.toString());
    }
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`, { params });
  }

  createTransaction(transaction: Partial<Transaction>): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction);
  }

  approveTransaction(id: number): Observable<Transaction> {
    return this.http.patch<Transaction>(`${this.apiUrl}/transactions/${id}/approve`, {});
  }
}
