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
    this.loadStats();
  }

  loadClaims() {
    this.claimService.getClaims().subscribe({
      next: (data) => {
        // FILTRE IMPORTANT: Si CITIZEN, voir SEULEMENT ses réclamations
        if (this.isCitizen()) {
          this.claims = data.filter(claim => 
            claim.citizenEmail === this.currentUser?.email ||
            claim.citizenName === this.currentUser?.username
          );
        } else {
          // AGENT, CHIEF, ADMIN voient TOUTES les réclamations
          this.claims = data;
        }
        this.filteredClaims = this.claims;
        this.loading = false;
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
        this.stats = data;
      }
    });
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
