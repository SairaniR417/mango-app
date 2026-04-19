import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  createOrder(data: any) {
    return this.http.post(`${this.baseUrl}/orders`, data);
  }

  getOrders() {
    return this.http.get(`${this.baseUrl}/orders`);
  }

  updateOrder(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/orders/${id}`, data);
  }

  getProducts() {
    return this.http.get(`${this.baseUrl}/products`);
  }
}


