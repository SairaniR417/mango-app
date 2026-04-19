import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss'
})

export class AdminOrdersComponent {
  orders: any[] = [];

  constructor(private api: ApiService) {
    this.load();
  }

  load() {
    this.api.getOrders().subscribe((res: any) => this.orders = res);
  }

  update(order: any, status: string) {
    this.api.updateOrder(order._id, { status })
      .subscribe(() => this.load());
  }
}