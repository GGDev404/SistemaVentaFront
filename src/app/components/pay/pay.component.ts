import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { loadStripe, Stripe, StripeElements, StripeCardElement, PaymentMethodResult } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { ProductService } from '../../Services/product-service.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent] // Importa ReactiveFormsModule aquí
})
export class PayComponent implements OnInit {
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  paymentForm: FormGroup;
  product: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private productService : ProductService) {
    this.paymentForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(1)]],
      name: ['', Validators.required] // Nombre para los detalles de facturación
    });
  }

  async ngOnInit(): Promise<void> {
    this.stripe = await loadStripe(environment.stripePublicKey);
    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    }

    // Recuperar el producto del servicio
    this.product = this.productService.getProduct();
    if (this.product) {
      this.paymentForm.patchValue({
        amount: this.product.price,
        name: this.product.name
      });
      console.log('Product:', this.product);
    } else {
      console.error('No product found in product service');
    }
  }

  async pay(): Promise<void> {
    if (!this.stripe || !this.elements || !this.card) {
      console.error('Stripe.js has not yet loaded.');
      return;
    }

    const { error, paymentMethod } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
      billing_details: {
        name: this.paymentForm.get('name')?.value
      }
    });

    if (error) {
      console.error('Error creating payment method:', error);
      return;
    }

    if (!this.product || !this.product.productId) {
      console.error('Product information is missing or invalid.');
      return;
    }
    console.log()
    console.log('Payment Method ID:', paymentMethod.id);
    console.log('Product ID:', this.product.productId);

    // Enviar los datos del producto junto con el pago
    this.http.post('http://localhost:5225/api/CreateSale', {
      CustomerId : 1,
      TotalAmount: this.paymentForm.get('amount')?.value,
      StripePaymentReference: paymentMethod.id,
      paymentType: 'Card', // Asegúrate de incluir este campo
      saleDetails: [
        {
          productId: this.product.productId,
          quantity: 1, // Ajusta la cantidad según sea necesario
          price: this.product.price
        }
      ]
    }).subscribe({
      next: (response) => {
        console.log('Payment successful', response);
        this.router.navigate(['/PaymentSucces']);
      },
      error: (err) => {
        console.error('Payment error', err);
      }
    });
  }


}
