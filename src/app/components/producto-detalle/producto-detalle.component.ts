import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../Interface/product';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { GetProductsService } from '../../Services/get-products.service';
import { ProductService } from '../../Services/product-service.service';


@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule,NavComponent],
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  productId: string | null = null;
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private productsService : GetProductsService, private productService : ProductService ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProduct(this.productId!);
  }

  getProduct(Id: string): void {
    let id = parseInt(Id);
    this.productsService.getProduct(id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  ProcessPayment(): void {
    this.productService.setProduct(this.product);
  this.router.navigate(['/payment']);
  }
}
