import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  weightOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Available weight options in kg
  searchText: string = '';

  constructor(private api: ApiService, private cart: CartService) { }

  ngOnInit() {
    this.api.getProducts().subscribe((res: any) => {
      this.products = res.map((p: any) => ({
        ...p,
        basePrice: p.price,
        selectedWeight: 1,
        variety: p.variety || 'Premium'
      }));
    });
  }

  add(item: any) {
    const itemToAdd = {
      ...item,
      price: item.basePrice * item.selectedWeight, // Calculate modified price
      weight: item.selectedWeight
    };
    this.cart.add(itemToAdd);
  }

  filteredProducts() {
    if (!this.searchText) return this.products;

    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (p.variety || '').toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}