import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Project } from '../../models/budget.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  loading = true;
  filterStatus = '';

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.budgetService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.filteredProjects = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  filterProjects() {
    if (this.filterStatus) {
      this.filteredProjects = this.projects.filter(p => p.status === this.filterStatus);
    } else {
      this.filteredProjects = this.projects;
    }
  }

  deleteProject(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
      this.budgetService.deleteProject(id).subscribe({
        next: () => {
          this.loadProjects();
        }
      });
    }
  }
}
