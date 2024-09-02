import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../Interface/product';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  private apiUrl = 'http://localhost:5225/api/Product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<{ $values: Product[] }>(this.apiUrl).pipe(
      map(response => response.$values)
    );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url); // Replace 'your-api-url' with your actual API URL
  }
}
