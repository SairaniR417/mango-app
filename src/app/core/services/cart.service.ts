import { Injectable } from '@angular/core';
export interface CartItem {
  name: string;
  price: number;   // price per kg
  weight: number;  // quantity in kg
}

@Injectable({ providedIn: 'root' })
export class CartService {
  items: any[] = [];

  add(item: CartItem) {
    const existing = this.items.find(i => i.name === item.name);

    if (existing) {
      existing.weight += item.weight || 1;
    } else {
      this.items.push({ ...item, weight: item.weight || 1 });
    }
  }

  get() {
    return this.items;
  }

  clear() {
    this.items = [];
  }

  remove(index: number) {
    this.items.splice(index, 1);
  }

  removeItem(item: any) {
    this.items = this.items.filter(i => i !== item);
  }

  updateWeight(index: number, weight: number) {
    if (weight <= 0) {
      this.remove(index);
    } else {
      this.items[index].weight = weight;
    }
  }

  getTotal() {
    return this.items.reduce((sum, i) => sum + (i.price * i.weight), 0);
  }
}