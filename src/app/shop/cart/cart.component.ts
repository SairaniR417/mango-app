import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent {

  constructor(public cart: CartService) { }

  total() {
    return this.cart.getTotal();
  }

  updateQty(i: number, event: any) {
    const value = Number(event.target.value);
    this.cart.updateWeight(i, value);
  }

  remove(index: number) {
    this.cart.remove(index);
  }
}