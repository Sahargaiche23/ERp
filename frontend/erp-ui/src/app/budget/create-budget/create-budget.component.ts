import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.css']
})
export class CreateBudgetComponent implements OnInit {
  budgetForm: FormGroup;
  loading = false;
  message = '';
  success = false;

  categories = [
    { value: 'INFRASTRUCTURE', label: 'Infrastructure', icon: '🏗️' },
    { value: 'EDUCATION', label: 'Éducation', icon: '🎓' },
    { value: 'HEALTH', label: 'Santé', icon: '🏥' },
    { value: 'SECURITY', label: 'Sécurité', icon: '🛡️' },
    { value: 'ENVIRONMENT', label: 'Environnement', icon: '🌿' },
    { value: 'CULTURE', label: 'Culture', icon: '🎭' },
    { value: 'SPORTS', label: 'Sports', icon: '⚽' },
    { value: 'SOCIAL', label: 'Social', icon: '🤝' }
  ];

  fiscalYears = [
    { value: 2024, label: '2024' },
    { value: 2025, label: '2025' },
    { value: 2026, label: '2026' }
  ];

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private router: Router
  ) {
    this.budgetForm = this.fb.group({
      department: ['', Validators.required],
      year: [2025, Validators.required],
      totalAllocated: ['', [Validators.required, Validators.min(1000)]],
      totalSpent: [0],
      status: ['APPROVED', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.budgetForm.invalid) {
      Object.keys(this.budgetForm.controls).forEach(key => {
        this.budgetForm.get(key)?.markAsTouched();
      });
      this.message = 'Veuillez remplir tous les champs requis';
      this.success = false;
      return;
    }

    this.loading = true;
    this.message = '';

    const budgetData = {
      department: this.budgetForm.value.department,
      year: this.budgetForm.value.year,
      totalAllocated: this.budgetForm.value.totalAllocated,
      totalSpent: this.budgetForm.value.totalSpent || 0,
      status: this.budgetForm.value.status
    };

    this.budgetService.createBudget(budgetData).subscribe({
      next: (budget) => {
        this.success = true;
        this.message = 'Budget créé avec succès!';
        this.loading = false;
        console.log('Budget créé:', budget);
        
        setTimeout(() => {
          this.router.navigate(['/dashboard/budget/budgets']).then(() => {
            window.location.reload();
          });
        }, 1500);
      },
      error: (error) => {
        this.success = false;
        this.message = 'Erreur lors de la création: ' + (error.error?.message || error.message);
        this.loading = false;
        console.error('Erreur création budget:', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/budget/budgets']);
  }
}
