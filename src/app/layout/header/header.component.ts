import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  search = '';

  constructor(
    public cart: CartService,
    public auth: AuthService,
    private router: Router
  ) { }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToProduct() {
    this.router.navigate(['/']);
  }
  toggleTheme() {
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
  }
}
