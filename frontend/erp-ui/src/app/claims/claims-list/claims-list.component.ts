import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../services/claim.service';
import { AuthService } from '../../services/auth.service';
import { Claim, ClaimStats } from '../../models/claim.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-claims-list',
  templateUrl: './claims-list.component.html',
  styleUrls: ['./claims-list.component.css']
})
export class ClaimsListComponent implements OnInit {
  claims: Claim[] = [];
  filteredClaims: Claim[] = [];
  stats: ClaimStats | null = null;
  loading = true;
  searchTerm = '';
  filterStatus = '';
  filterCategory = '';
  filterPriority = '';
  currentUser: User | null = null;

  constructor(
    private claimService: ClaimService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadClaims();
  }

  loadClaims() {
    this.claimService.getClaims().subscribe({
      next: (data) => {
        // FILTRE IMPORTANT: Si CITIZEN, voir SEULEMENT ses réclamations
        if (this.isCitizen()) {
          const userEmail = this.currentUser?.email?.toLowerCase();
          const userName = this.currentUser?.username?.toLowerCase();
          
          this.claims = data.filter(claim => {
            const claimEmail = claim.citizenEmail?.toLowerCase();
            const claimName = claim.citizenName?.toLowerCase();
            
            // Correspondance exacte sur email OU username
            return (userEmail && claimEmail === userEmail) || 
                   (userName && claimName === userName);
          });
          
          console.log('🔍 Filtre citoyen:', {
            userEmail,
            userName,
            totalClaims: data.length,
            myClaims: this.claims.length
          });
        } else {
          // AGENT, CHIEF, ADMIN voient TOUTES les réclamations
          this.claims = data;
        }
        this.filteredClaims = this.claims;
        this.loading = false;
        
        // Charger les stats APRÈS avoir chargé les réclamations
        this.loadStats();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  isCitizen(): boolean {
    return this.currentUser?.role?.toUpperCase() === 'CITIZEN';
  }

  loadStats() {
    this.claimService.getStats().subscribe({
      next: (data) => {
        // Si CITIZEN, calculer les stats SEULEMENT pour ses réclamations
        if (this.isCitizen()) {
          this.stats = this.calculateUserStats();
        } else {
          // AGENT, CHIEF, ADMIN voient les stats globales
          this.stats = data;
        }
      }
    });
  }

  calculateUserStats(): ClaimStats {
    const total = this.claims.length;
    const newClaims = this.claims.filter(c => c.status === 'NEW').length;
    const inProgress = this.claims.filter(c => c.status === 'IN_PROGRESS').length;
    const resolved = this.claims.filter(c => c.status === 'RESOLVED').length;
    const closed = this.claims.filter(c => c.status === 'CLOSED').length;
    const rejected = this.claims.filter(c => c.status === 'REJECTED').length;
    
    // Calculer par catégorie
    const byCategory: { [key: string]: number } = {};
    this.claims.forEach(c => {
      byCategory[c.category] = (byCategory[c.category] || 0) + 1;
    });
    
    // Calculer par priorité
    const byPriority: { [key: string]: number } = {};
    this.claims.forEach(c => {
      byPriority[c.priority] = (byPriority[c.priority] || 0) + 1;
    });
    
    // Calculer temps moyen de résolution
    const resolvedClaims = this.claims.filter(c => c.resolvedAt);
    let averageResolutionTime = 0;
    if (resolvedClaims.length > 0) {
      const totalTime = resolvedClaims.reduce((sum, c) => {
        const created = new Date(c.createdAt).getTime();
        const resolved = new Date(c.resolvedAt!).getTime();
        return sum + (resolved - created);
      }, 0);
      averageResolutionTime = totalTime / resolvedClaims.length / (1000 * 60 * 60 * 24); // en jours
    }
    
    return {
      total,
      new: newClaims,
      inProgress,
      resolved,
      closed,
      rejected,
      byCategory,
      byPriority,
      averageResolutionTime
    };
  }

  filterClaims() {
    this.filteredClaims = this.claims.filter(claim => {
      const matchesSearch = !this.searchTerm || 
        claim.citizenName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        claim.subject.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.filterStatus || claim.status === this.filterStatus;
      const matchesCategory = !this.filterCategory || claim.category === this.filterCategory;
      const matchesPriority = !this.filterPriority || claim.priority === this.filterPriority;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    });
  }

  updateStatus(id: string, status: string) {
    this.claimService.updateClaimStatus(id, status).subscribe({
      next: () => {
        this.loadClaims();
        this.loadStats();
      }
    });
  }

  deleteClaim(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réclamation?')) {
      this.claimService.deleteClaim(id).subscribe({
        next: () => {
          this.loadClaims();
          this.loadStats();
        }
      });
    }
  }
}
