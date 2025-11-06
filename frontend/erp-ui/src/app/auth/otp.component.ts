import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html'
})
export class OtpComponent implements OnInit {
  loading = false;
  message = '';
  form;
  sessionId = '';
  resetEmail = '';
  isPasswordReset = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      otpCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.resetEmail = localStorage.getItem('resetEmail') || '';
    this.sessionId = localStorage.getItem('sessionId') || '';
    
    if (this.resetEmail) {
      this.isPasswordReset = true;
    } else if (!this.sessionId) {
      this.router.navigate(['/login']);
    }
  }

  verify() {
    if (this.form.invalid) return;
    
    if (this.isPasswordReset) {
      // Password reset flow
      if (this.form.value.newPassword !== this.form.value.confirmPassword) {
        this.message = 'Les mots de passe ne correspondent pas';
        return;
      }
      
      this.loading = true;
      this.message = '';

      const request = {
        email: this.resetEmail,
        code: this.form.value.otpCode,
        newPassword: this.form.value.newPassword
      };

      this.authService.verifyOtpAndResetPassword(request).subscribe({
        next: () => {
          localStorage.removeItem('resetEmail');
          this.message = 'Mot de passe réinitialisé avec succès! Redirection...';
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
        error: (err) => {
          this.message = err.error?.error || err.error?.message || 'Code OTP invalide ou expiré';
          this.loading = false;
        }
      });
    } else {
      // Normal OTP verification
      this.loading = true;
      this.message = '';

      const request = {
        sessionId: this.sessionId,
        otpCode: this.form.value.otpCode
      };

      this.authService.verifyOtp(request).subscribe({
        next: () => {
          localStorage.removeItem('sessionId');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.message = err.error?.error || err.error?.message || 'Code OTP invalide';
          this.loading = false;
        }
      });
    }
  }

  resendOtp() {
    if (this.isPasswordReset && this.resetEmail) {
      this.authService.sendResetOtp({ email: this.resetEmail }).subscribe({
        next: () => {
          this.message = 'Code OTP renvoyé à votre email';
        },
        error: () => {
          this.message = 'Erreur lors de l\'envoi du code OTP';
        }
      });
    } else {
      this.message = 'Impossible de renvoyer le code OTP';
    }
  }
}
