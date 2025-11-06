import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaimService } from '../../services/claim.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.css']
})
export class CreateClaimComponent implements OnInit {
  claimForm: FormGroup;
  loading = false;
  message = '';
  success = false;

  categories = [
    { value: 'INFRASTRUCTURE', label: 'Infrastructure' },
    { value: 'SANITATION', label: 'Assainissement' },
    { value: 'LIGHTING', label: 'Éclairage Public' },
    { value: 'SECURITY', label: 'Sécurité' },
    { value: 'ADMINISTRATIVE', label: 'Administratif' },
    { value: 'OTHER', label: 'Autre' }
  ];

  priorities = [
    { value: 'LOW', label: 'Basse', icon: '🟢' },
    { value: 'MEDIUM', label: 'Moyenne', icon: '🟡' },
    { value: 'HIGH', label: 'Haute', icon: '🟠' },
    { value: 'URGENT', label: 'Urgente', icon: '🔴' }
  ];

  constructor(
    private fb: FormBuilder,
    private claimService: ClaimService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    const currentUser = this.authService.getCurrentUser();
    
    this.claimForm = this.fb.group({
      citizenName: [currentUser?.fullName || currentUser?.username || '', Validators.required],
      citizenEmail: [currentUser?.email || '', [Validators.required, Validators.email]],
      citizenPhone: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['MEDIUM', Validators.required],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.claimForm.invalid) {
      Object.keys(this.claimForm.controls).forEach(key => {
        this.claimForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.message = '';

    this.claimService.createClaim(this.claimForm.value).subscribe({
      next: (response) => {
        this.success = true;
        this.message = 'Réclamation créée avec succès!';
        this.loading = false;
        
        // Envoyer notification au CHIEF
        this.notificationService.notifyClaimCreated(
          response.id?.toString() || 'new',
          this.claimForm.value.citizenName,
          this.claimForm.value.subject
        );
        
        setTimeout(() => {
          this.router.navigate(['/dashboard/claims']);
        }, 2000);
      },
      error: (error) => {
        this.success = false;
        this.message = 'Erreur lors de la création de la réclamation';
        this.loading = false;
        console.error('Error creating claim:', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/claims']);
  }
}
