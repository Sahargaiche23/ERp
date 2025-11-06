import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClaimService } from '../../services/claim.service';
import { EmployeeService } from '../../services/employee.service';
import { BudgetService } from '../../services/budget.service';
import { ReportService } from '../../services/report.service';
import { User } from '../../models/user.model';
import { ClaimStats } from '../../models/claim.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  loading = true;
  
  // Statistiques dynamiques
  stats = {
    users: 0,
    budget: 0,
    claims: 0,
    projects: 0,
    performance: 0,
    resolved: 0,
    agents: 0,
    teamPerformance: 0
  };

  constructor(
    private authService: AuthService,
    private claimService: ClaimService,
    private employeeService: EmployeeService,
    private budgetService: BudgetService,
    private reportService: ReportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.loadDynamicStats();
  }

  loadDynamicStats(): void {
    // Charger TOUTES les statistiques en parallèle
    forkJoin({
      claims: this.claimService.getStats(),
      employees: this.employeeService.getEmployees(),
      budgets: this.budgetService.getBudgets(),
      users: this.authService.getAllUsers()
    }).subscribe({
      next: (data) => {
        console.log('📊 Données chargées:', data);
        
        // Réclamations
        this.stats.claims = data.claims.total || 0;
        this.stats.resolved = data.claims.resolved || 0;
        
        // Employés
        this.stats.agents = data.employees.length || 0;
        
        // Budgets - Calculer le total
        this.stats.budget = data.budgets.reduce((sum: number, b: any) => sum + (b.totalAllocated || 0), 0);
        
        // Projets = Nombre de budgets (car les projets sont dans la table budget)
        this.stats.projects = data.budgets.length || 0;
        
        // Utilisateurs
        this.stats.users = data.users.length || 0;
        
        // Performance
        if (data.claims.total > 0) {
          this.stats.performance = Math.round((data.claims.resolved / data.claims.total) * 100);
        } else {
          this.stats.performance = 0;
        }
        
        // Performance équipe (même que performance globale)
        this.stats.teamPerformance = this.stats.performance;
        
        console.log('✅ Stats calculées:', this.stats);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erreur chargement statistiques:', err);
        this.loading = false;
      }
    });
  }
  isCitizen(): boolean {
    return this.currentUser?.role?.toUpperCase() === 'CITIZEN';
  }

  isAgent(): boolean {
    return this.currentUser?.role?.toUpperCase() === 'AGENT';
  }

  isChief(): boolean {
    return this.currentUser?.role?.toUpperCase() === 'CHIEF';
  }

  isAdmin(): boolean {
    return this.currentUser?.role?.toUpperCase() === 'ADMIN';
  }
}
