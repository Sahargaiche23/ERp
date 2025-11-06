import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { Budget, Project } from '../../models/budget.model';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.css']
})
export class BudgetDetailComponent implements OnInit {
  budget: Budget | null = null;
  projects: Project[] = [];
  loading = true;
  budgetId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.budgetId = +params['id'];
      this.loadBudgetDetails();
    });
  }

  loadBudgetDetails(): void {
    this.budgetService.getBudget(this.budgetId).subscribe({
      next: (budget) => {
        this.budget = budget;
        this.loadRelatedProjects();
      },
      error: (error) => {
        console.error('Erreur chargement budget:', error);
        this.loading = false;
      }
    });
  }

  loadRelatedProjects(): void {
    if (this.budget) {
      this.budgetService.getProjects(this.budget.department).subscribe({
        next: (projects) => {
          this.projects = projects;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur chargement projets:', error);
          this.loading = false;
        }
      });
    }
  }

  getUtilizationPercentage(): number {
    if (!this.budget || this.budget.totalAllocated === 0) return 0;
    return Math.round((this.budget.totalSpent / this.budget.totalAllocated) * 100);
  }

  getRemainingAmount(): number {
    if (!this.budget) return 0;
    return this.budget.totalAllocated - this.budget.totalSpent;
  }

  goBack(): void {
    this.router.navigate(['/admin/budgets']);
  }

  editBudget(): void {
    this.router.navigate(['/admin/budgets/edit', this.budgetId]);
  }
}
