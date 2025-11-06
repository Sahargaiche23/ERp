import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient,
    private router: Router
  ) {
    this.budgetForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', Validators.required],
      fiscalYear: [2025, Validators.required],
      totalAmount: ['', [Validators.required, Validators.min(1000)]],
      allocatedAmount: [0],
      spentAmount: [0],
      department: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      status: ['DRAFT', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.budgetForm.invalid) {
      Object.keys(this.budgetForm.controls).forEach(key => {
        this.budgetForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.message = '';

    // API call simulée
    setTimeout(() => {
      this.success = true;
      this.message = 'Budget créé avec succès!';
      this.loading = false;
      
      setTimeout(() => {
        this.router.navigate(['/dashboard/budget/budgets']);
      }, 2000);
    }, 1000);
  }

  cancel(): void {
    this.router.navigate(['/dashboard/budget/budgets']);
  }
}
