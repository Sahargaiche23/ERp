import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// Auth Components
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { OtpComponent } from './auth/otp.component';
import { ResetComponent } from './auth/reset.component';

// Dashboard Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';

// HR Components
import { EmployeesComponent } from './hr/employees/employees.component';
import { CreateEmployeeComponent } from './hr/create-employee/create-employee.component';
import { LeavesComponent } from './hr/leaves/leaves.component';
import { AttendanceComponent } from './hr/attendance/attendance.component';

// Budget Components
import { BudgetsComponent } from './budget/budgets/budgets.component';
import { CreateBudgetComponent } from './budget/create-budget/create-budget.component';
import { ProjectsComponent } from './budget/projects/projects.component';

// Claims Components
import { ClaimsListComponent } from './claims/claims-list/claims-list.component';
import { CreateClaimComponent } from './claims/create-claim/create-claim.component';
import { ClaimDetailComponent } from './claims/claim-detail/claim-detail.component';

// Reports Components
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'reset', component: ResetComponent },
  
  // Routes pour chaque rôle - redirigent vers le dashboard principal pour l'instant
  { path: 'citizen/dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'agent/dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'chief/dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'admin/dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
  
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'hr', redirectTo: 'hr/employees', pathMatch: 'full' },
      { path: 'hr/employees', component: EmployeesComponent },
      { path: 'hr/employees/new', component: CreateEmployeeComponent },
      { path: 'hr/leaves', component: LeavesComponent },
      { path: 'hr/attendance', component: AttendanceComponent },
      { path: 'budget', redirectTo: 'budget/budgets', pathMatch: 'full' },
      { path: 'budget/budgets', component: BudgetsComponent },
      { path: 'budget/budgets/new', component: CreateBudgetComponent },
      { path: 'budget/projects', component: ProjectsComponent },
      { path: 'claims', component: ClaimsListComponent },
      { path: 'claims/new', component: CreateClaimComponent },
      { path: 'claims/:id', component: ClaimDetailComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
