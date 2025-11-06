import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, OtpRequest, ResetPasswordRequest, RegisterRequest, User } from '../models/user.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.apiUrl = this.config.getAuthApiUrl();
    const user = this.getUserFromStorage();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request);
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.accessToken) {
            this.setSession(response);
          }
        })
      );
  }

  verifyOtp(request: OtpRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/verify-otp`, request)
      .pipe(
        tap(response => {
          if (response.accessToken && response.user) {
            this.setSession(response);
          }
        })
      );
  }

  sendResetOtp(request: { email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, request);
  }

  verifyOtpAndResetPassword(request: { email: string, code: string, newPassword: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/verify-otp`, request)
      .pipe(
        tap(response => {
          if (response.accessToken) {
            this.setSession(response);
          }
        })
      );
  }

  resetPassword(request: ResetPasswordRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, request);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/users`);
  }

  updateUserRole(userId: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/users/${userId}/role`, { role });
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setSession(response: LoginResponse): void {
    if (response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
      
      // Extraire les infos utilisateur du JWT
      try {
        const payload = JSON.parse(atob(response.accessToken.split('.')[1]));
        const user: User = {
          id: 0, // ID numérique non disponible dans JWT
          username: payload.username || '',
          email: payload.email || '',
          fullName: payload.username || '',
          role: payload.role || 'CITIZEN'
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Failed to decode JWT', e);
      }
    }
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }
    if (response.user) {
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      this.currentUserSubject.next(response.user);
    }
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    } catch {
      return true;
    }
  }
}
