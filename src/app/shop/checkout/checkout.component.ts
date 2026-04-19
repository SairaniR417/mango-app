import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})

export class CheckoutComponent {
  name = '';
  phone = '';
  address = '';

  constructor(private api: ApiService, private cart: CartService) { }

  order() {
    const data = {
      items: this.cart.get(),
      totalAmount: this.totalAmount(),
      name: this.name,
      phone: this.phone,
      address: this.address
    };

    this.api.createOrder(data).subscribe(() => {
      alert('Order placed ✅');
      this.cart.clear();
    });
  }

  totalAmount(): number {
    return this.cart.get().reduce((s, i) => s + i.pricePerKg * i.weight, 0);
  }
}