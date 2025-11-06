import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loading = false;
  message = '';
  form;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.message = '';
    
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        console.log('Login response:', res);
        if (res.requiresOtp) {
          localStorage.setItem('sessionId', res.sessionId || '');
          this.router.navigate(['/otp']);
        } else if (res.accessToken) {
          // Décoder le JWT pour obtenir le rôle
          const payload = JSON.parse(atob(res.accessToken.split('.')[1]));
          console.log('JWT Payload:', payload);
          
          // Rediriger selon le rôle
          const role = payload.role?.toLowerCase();
          if (role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else if (role === 'chief') {
            this.router.navigate(['/chief/dashboard']);
          } else if (role === 'agent') {
            this.router.navigate(['/agent/dashboard']);
          } else if (role === 'citizen') {
            this.router.navigate(['/citizen/dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Login error:', err);
        this.message = err.error?.error || err.error?.message || 'Échec de connexion. Vérifiez vos identifiants.';
        this.loading = false;
      }
    });
  }
}
