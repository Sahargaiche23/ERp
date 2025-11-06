import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html'
})
export class ResetComponent {
  loading = false;
  message = '';
  success = false;
  form;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.message = '';
    this.success = false;

    this.authService.sendResetOtp({ email: this.form.value.email }).subscribe({
      next: () => {
        this.success = true;
        this.message = 'Un code OTP a été envoyé à votre email';
        this.loading = false;
        // Store email in localStorage for OTP verification
        localStorage.setItem('resetEmail', this.form.value.email);
        setTimeout(() => {
          this.router.navigate(['/otp']);
        }, 2000);
      },
      error: (err) => {
        this.message = err.error?.error || err.error?.message || 'Erreur lors de la réinitialisation';
        this.loading = false;
      }
    });
  }
}
