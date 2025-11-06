import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimService } from '../../services/claim.service';
import { AuthService } from '../../services/auth.service';
import { Claim, ClaimComment } from '../../models/claim.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.css']
})
export class ClaimDetailComponent implements OnInit {
  claim: Claim | null = null;
  comments: ClaimComment[] = [];
  currentUser: User | null = null;
  loading = true;
  
  newComment = '';
  addingComment = false;
  updatingStatus = false;
  
  statusOptions = [
    { value: 'NEW', label: 'Nouvelle', color: '#3b82f6' },
    { value: 'IN_PROGRESS', label: 'En cours', color: '#f59e0b' },
    { value: 'RESOLVED', label: 'Résolue', color: '#10b981' },
    { value: 'CLOSED', label: 'Fermée', color: '#6b7280' },
    { value: 'REJECTED', label: 'Rejetée', color: '#ef4444' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private claimService: ClaimService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadClaim(id);
      this.loadComments(id);
    } else {
      this.loading = false;
      this.router.navigate(['/dashboard/claims']);
    }
  }

  loadClaim(id: string): void {
    this.claimService.getClaim(id).subscribe({
      next: (data) => {
        this.claim = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading claim:', err);
        this.loading = false;
        // Rediriger vers la liste si réclamation non trouvée
        setTimeout(() => {
          this.router.navigate(['/dashboard/claims']);
        }, 2000);
      }
    });
  }

  loadComments(id: string): void {
    this.claimService.getComments(id).subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (err) => {
        console.error('Error loading comments:', err);
      }
    });
  }

  // Vérification des rôles
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

  // Permissions
  canAcceptReject(): boolean {
    return this.isChief() || this.isAdmin();
  }

  canRespond(): boolean {
    return this.isAgent() || this.isChief() || this.isAdmin();
  }

  canChangeStatus(): boolean {
    return this.isAgent() || this.isChief() || this.isAdmin();
  }

  // Actions
  acceptClaim(): void {
    if (!this.claim || !this.canAcceptReject()) return;
    
    this.updatingStatus = true;
    this.claimService.updateClaimStatus(this.claim.id, 'IN_PROGRESS').subscribe({
      next: () => {
        if (this.claim) {
          this.claim.status = 'IN_PROGRESS';
          this.addSystemComment('Réclamation acceptée et prise en charge');
        }
        this.updatingStatus = false;
      },
      error: (err) => {
        console.error('Error accepting claim:', err);
        this.updatingStatus = false;
      }
    });
  }

  rejectClaim(): void {
    if (!this.claim || !this.canAcceptReject()) return;
    
    const reason = prompt('Raison du refus:');
    if (!reason) return;
    
    this.updatingStatus = true;
    this.claimService.updateClaimStatus(this.claim.id, 'REJECTED', reason).subscribe({
      next: () => {
        if (this.claim) {
          this.claim.status = 'REJECTED';
          this.claim.resolution = reason;
          this.addSystemComment(`Réclamation rejetée. Raison: ${reason}`);
        }
        this.updatingStatus = false;
      },
      error: (err) => {
        console.error('Error rejecting claim:', err);
        this.updatingStatus = false;
      }
    });
  }

  changeStatus(newStatus: string): void {
    if (!this.claim || !this.canChangeStatus()) return;
    
    this.updatingStatus = true;
    this.claimService.updateClaimStatus(this.claim.id, newStatus).subscribe({
      next: () => {
        if (this.claim) {
          this.claim.status = newStatus as any;
          this.addSystemComment(`Statut changé à: ${this.getStatusLabel(newStatus)}`);
        }
        this.updatingStatus = false;
      },
      error: (err) => {
        console.error('Error changing status:', err);
        this.updatingStatus = false;
      }
    });
  }

  addComment(): void {
    if (!this.claim || !this.newComment.trim() || !this.canRespond()) return;
    
    this.addingComment = true;
    
    // Utiliser l'endpoint /respond au lieu de /comments
    this.claimService.respondToClaim(this.claim.id, this.newComment).subscribe({
      next: (updatedClaim) => {
        // Ajouter le commentaire à l'historique local
        this.addSystemComment(this.newComment);
        this.newComment = '';
        this.addingComment = false;
        alert('Réponse envoyée avec succès!');
      },
      error: (err) => {
        console.error('Error adding comment:', err);
        this.addingComment = false;
        alert('Erreur lors de l\'envoi de la réponse');
      }
    });
  }

  private addSystemComment(message: string): void {
    const systemComment: ClaimComment = {
      id: Date.now(),
      claimId: this.claim!.id,
      author: this.currentUser?.username || 'System',
      comment: message,
      createdAt: new Date()
    };
    this.comments.push(systemComment);
  }

  getStatusLabel(status: string): string {
    return this.statusOptions.find(s => s.value === status)?.label || status;
  }

  getStatusColor(status: string): string {
    return this.statusOptions.find(s => s.value === status)?.color || '#6b7280';
  }

  getPriorityIcon(priority: string): string {
    const icons: any = {
      'LOW': '🟢',
      'MEDIUM': '🟡',
      'HIGH': '🟠',
      'URGENT': '🔴'
    };
    return icons[priority] || '⚪';
  }

  getCategoryLabel(category: string): string {
    const labels: any = {
      'INFRASTRUCTURE': '🏗️ Infrastructure',
      'SANITATION': '🧹 Assainissement',
      'LIGHTING': '💡 Éclairage',
      'SECURITY': '🛡️ Sécurité',
      'ADMINISTRATIVE': '📋 Administratif',
      'OTHER': '❓ Autre'
    };
    return labels[category] || category;
  }

  goBack(): void {
    this.router.navigate(['/dashboard/claims']);
  }
}
