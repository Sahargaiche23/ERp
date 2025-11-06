import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClaimService } from '../../services/claim.service';
import { User } from '../../models/user.model';
import { ClaimStats } from '../../models/claim.model';

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
    // Charger les vraies statistiques depuis l'API
    this.claimService.getStats().subscribe({
      next: (claimStats: ClaimStats) => {
        this.stats.claims = claimStats.total;
        this.stats.resolved = claimStats.resolved;
        
        // Calculer la performance basée sur les réclamations résolues
        if (claimStats.total > 0) {
          this.stats.performance = Math.round((claimStats.resolved / claimStats.total) * 100);
          this.stats.teamPerformance = this.stats.performance;
        }
        
        this.loading = false;
      },
      error: () => {
        // Valeurs par défaut si API échoue
        this.stats = {
          users: 150,
          budget: 5000000,
          claims: 23,
          projects: 8,
          performance: 95,
          resolved: 156,
          agents: 12,
          teamPerformance: 85
        };
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
