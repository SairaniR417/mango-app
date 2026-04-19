import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

type Step = 'phone' | 'otp';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  step: Step = 'phone';

  phone = '';
  name = '';
  otp = '';

  loading = false;
  error = '';
  successMsg = '';

  // Resend timer
  resendCooldown = 0;
  private resendInterval: any;

  constructor(private auth: AuthService, private router: Router) {}

  /** Step 1: Send OTP */
  sendOtp() {
    this.error = '';
    if (!this.phone || this.phone.length < 10) {
      this.error = 'Please enter a valid 10-digit phone number.';
      return;
    }

    this.loading = true;
    this.auth.sendOtp(this.phone).subscribe({
      next: () => {
        this.loading = false;
        this.step = 'otp';
        this.startResendTimer();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Failed to send OTP. Check your number.';
      }
    });
  }

  /** Step 2: Verify OTP */
  verifyOtp() {
    this.error = '';
    if (!this.otp || this.otp.length !== 6) {
      this.error = 'Please enter the 6-digit OTP.';
      return;
    }

    this.loading = true;
    this.auth.verifyOtp(this.phone, this.otp, this.name).subscribe({
      next: (res) => {
        this.loading = false;
        this.auth.setSession(res.token, res.user);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Invalid OTP. Please try again.';
      }
    });
  }

  /** Resend OTP */
  resendOtp() {
    if (this.resendCooldown > 0) return;
    this.error = '';
    this.otp = '';
    this.loading = true;
    this.auth.sendOtp(this.phone).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = 'OTP resent!';
        setTimeout(() => (this.successMsg = ''), 3000);
        this.startResendTimer();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Failed to resend OTP.';
      }
    });
  }

  goBack() {
    this.step = 'phone';
    this.otp = '';
    this.error = '';
    clearInterval(this.resendInterval);
    this.resendCooldown = 0;
  }

  private startResendTimer() {
    this.resendCooldown = 30;
    clearInterval(this.resendInterval);
    this.resendInterval = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) {
        clearInterval(this.resendInterval);
      }
    }, 1000);
  }
}
