import { Injectable } from '@angular/core';
import { CartItem } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {

  items: CartItem[] = [];

  constructor() {
    this.load();
  }

  add(item: CartItem) {
    const existing = this.items.find(i => i.name === item.name);

    if (existing) {
      existing.weight += item.weight;
    } else {
      this.items.push(item);
    }

    this.save();
  }

  get() {
    return this.items;
  }

  remove(index: number) {
    this.items.splice(index, 1);
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  updateWeight(index: number, weight: number) {
    if (weight <= 0) {
      this.remove(index);
    } else {
      this.items[index].weight = weight;
    }
    this.save();
  }

  getTotal() {
    return this.items.reduce((sum, i) => sum + (i.pricePerKg * i.weight), 0);
  }

  /* 🔥 Local Storage */
  private save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  private load() {
    const data = localStorage.getItem('cart');
    if (data) this.items = JSON.parse(data);
  }
}