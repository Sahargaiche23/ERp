import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthInterceptor } from './interceptors/auth.interceptor';

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
import { EmployeeDetailComponent } from './hr/employee-detail/employee-detail.component';
import { LeavesComponent } from './hr/leaves/leaves.component';
import { AttendanceComponent } from './hr/attendance/attendance.component';

// Budget Components
import { BudgetsComponent } from './budget/budgets/budgets.component';
import { CreateBudgetComponent } from './budget/create-budget/create-budget.component';
import { ProjectsComponent } from './budget/projects/projects.component';
import { BudgetDetailComponent } from './budget/budget-detail/budget-detail.component';

// Claims Components
import { ClaimsListComponent } from './claims/claims-list/claims-list.component';
import { CreateClaimComponent } from './claims/create-claim/create-claim.component';
import { ClaimDetailComponent } from './claims/claim-detail/claim-detail.component';

// Reports Components
import { ReportsComponent } from './reports/reports.component';

// Admin Components
import { LogsAuditComponent } from './admin/logs-audit/logs-audit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OtpComponent,
    ResetComponent,
    DashboardComponent,
    HomeComponent,
    EmployeesComponent,
    CreateEmployeeComponent,
    EmployeeDetailComponent,
    LeavesComponent,
    AttendanceComponent,
    BudgetsComponent,
    CreateBudgetComponent,
    ProjectsComponent,
    BudgetDetailComponent,
    ClaimsListComponent,
    CreateClaimComponent,
    ClaimDetailComponent,
    ReportsComponent,
    LogsAuditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
