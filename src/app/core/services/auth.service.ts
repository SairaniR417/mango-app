import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'http://localhost:3000/api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = signal<any>(JSON.parse(localStorage.getItem('user') || 'null'));
  token = signal<string | null>(localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  /** Step 1: send OTP to phone */
  sendOtp(phone: string) {
    return this.http.post<{ success: boolean; message: string }>(
      `${API}/send-otp`,
      { phone }
    );
  }

  /** Step 2: verify OTP, receive user + JWT */
  verifyOtp(phone: string, otp: string, name: string) {
    return this.http.post<{ success: boolean; token: string; user: any }>(
      `${API}/verify-otp`,
      { phone, otp, name }
    );
  }

  /** Persist session after successful OTP verification */
  setSession(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token.set(token);
    this.user.set(user);
  }

  getToken(): string | null {
    return this.token();
  }

  isLoggedIn(): boolean {
    return !!this.token();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token.set(null);
    this.user.set(null);
  }
}