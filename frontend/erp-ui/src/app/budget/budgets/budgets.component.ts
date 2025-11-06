import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Budget } from '../../models/budget.model';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  budgets: Budget[] = [];
  loading = true;
  selectedYear = new Date().getFullYear();

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.loadBudgets();
  }

  loadBudgets() {
    this.budgetService.getBudgets(this.selectedYear).subscribe({
      next: (data) => {
        this.budgets = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onYearChange() {
    this.loadBudgets();
  }

  getProgressPercent(budget: Budget): number {
    return budget.totalAllocated > 0 ? (budget.totalSpent / budget.totalAllocated) * 100 : 0;
  }
}
