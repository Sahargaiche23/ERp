import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  loading = false;
  message = '';
  messageType: 'success' | 'error' = 'error';
  form;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.message = 'Les mots de passe ne correspondent pas';
      this.messageType = 'error';
      return;
    }

    this.loading = true;
    this.message = '';

    const request = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      role: 'CITIZEN'
    };

    this.authService.register(request).subscribe({
      next: () => {
        this.message = 'Inscription réussie ! Redirection vers la connexion...';
        this.messageType = 'success';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.message = err.error?.message || 'Échec de l\'inscription. Veuillez réessayer.';
        this.messageType = 'error';
        this.loading = false;
      }
    });
  }

  private markFormGroupTouched(formGroup: any) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
