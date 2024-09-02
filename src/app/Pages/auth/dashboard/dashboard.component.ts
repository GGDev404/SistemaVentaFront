import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../../components/nav/nav.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Product } from '../../../Interface/product';
import { GetProductsService } from '../../../Services/get-products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];

  constructor(private productsService: GetProductsService, private router: Router) {}

  ngOnInit(): void {
    this.getProduct();
  }

  productoDetail(Id: number): void {
    this.router.navigate(['/product', Id]);
  }

  getProduct(): void {
    this.productsService.getProducts().subscribe({
      next: (result) => {
        this.products = result;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
