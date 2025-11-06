export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  department?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  requiresOtp: boolean;
  sessionId?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}

export interface OtpRequest {
  sessionId: string;
  otpCode: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
}
