import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  loading = true;
  searchTerm = '';
  filterStatus = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  filterEmployees() {
    this.filteredEmployees = this.employees.filter(emp => {
      const matchesSearch = !this.searchTerm || 
        emp.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        emp.matricule.includes(this.searchTerm);
      
      const matchesStatus = !this.filterStatus || emp.status === this.filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }

  viewEmployee(id: number) {
    this.router.navigate(['/dashboard/hr/employees', id]);
  }

  deleteEmployee(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
        }
      });
    }
  }
}
