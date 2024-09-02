import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private product: any;

  setProduct(product: any): void {
    this.product = product;
  }

  getProduct(): any {
    return this.product;
  }
}
