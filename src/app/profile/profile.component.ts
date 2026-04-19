import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(public auth: AuthService) { }

  getInitial(): string {
    const name = this.auth.user()?.name || '';
    return name ? name.charAt(0).toUpperCase() : '🥭';
  }
}
