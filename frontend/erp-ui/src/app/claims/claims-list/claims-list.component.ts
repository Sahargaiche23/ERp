import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../services/claim.service';
import { Claim, ClaimStats } from '../../models/claim.model';

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

  constructor(private claimService: ClaimService) {}

  ngOnInit() {
    this.loadClaims();
    this.loadStats();
  }

  loadClaims() {
    this.claimService.getClaims().subscribe({
      next: (data) => {
        this.claims = data;
        this.filteredClaims = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
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

  updateStatus(id: number, status: string) {
    this.claimService.updateClaimStatus(id, status).subscribe({
      next: () => {
        this.loadClaims();
        this.loadStats();
      }
    });
  }

  deleteClaim(id: number) {
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
