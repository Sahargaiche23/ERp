import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  loading = false;
  message = '';
  success = false;

  departments = [
    { value: 'RH', label: 'Ressources Humaines' },
    { value: 'IT', label: 'Informatique' },
    { value: 'FINANCE', label: 'Finance' },
    { value: 'OPERATIONS', label: 'Opérations' },
    { value: 'CLAIMS', label: 'Réclamations' },
    { value: 'MAINTENANCE', label: 'Maintenance' }
  ];

  positions = [
    { value: 'MANAGER', label: 'Manager' },
    { value: 'SUPERVISOR', label: 'Superviseur' },
    { value: 'AGENT', label: 'Agent' },
    { value: 'TECHNICIAN', label: 'Technicien' },
    { value: 'ADMIN', label: 'Administrateur' }
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      matricule: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      hireDate: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    // Générer matricule automatiquement
    this.generateMatricule();
  }

  generateMatricule(): void {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.employeeForm.patchValue({ matricule: `EMP${year}${random}` });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      Object.keys(this.employeeForm.controls).forEach(key => {
        this.employeeForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.message = '';

    // Appel API HR Service (port 8082)
    this.http.post('http://localhost:8082/api/employees', this.employeeForm.value).subscribe({
      next: (response) => {
        this.success = true;
        this.message = 'Employé créé avec succès!';
        this.loading = false;
        
        setTimeout(() => {
          this.router.navigate(['/dashboard/hr/employees']);
        }, 2000);
      },
      error: (error) => {
        this.success = false;
        this.message = 'Erreur lors de la création de l\'employé';
        this.loading = false;
        console.error('Error creating employee:', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/hr/employees']);
  }
}
