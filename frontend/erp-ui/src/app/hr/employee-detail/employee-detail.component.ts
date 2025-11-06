import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployee(+id);
    }
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (data) => {
        this.employee = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading employee:', err);
        this.loading = false;
        this.router.navigate(['/dashboard/hr/employees']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/hr/employees']);
  }

  editEmployee(): void {
    if (this.employee) {
      this.router.navigate(['/dashboard/hr/employees', this.employee.id, 'edit']);
    }
  }

  deleteEmployee(): void {
    if (!this.employee) return;
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${this.employee.firstName} ${this.employee.lastName}?`)) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe({
        next: () => {
          alert('Employé supprimé avec succès');
          this.router.navigate(['/dashboard/hr/employees']);
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }
}
