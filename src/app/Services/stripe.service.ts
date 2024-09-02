import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment'; // Asegúrate de tener tus claves en el archivo de entorno
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(environment.stripePublicKey);
  }

  getStripeInstance(): Promise<Stripe | null> {
    return this.stripePromise;
  }

  createPaymentIntent(amount: number): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/CashSale/create-payment-intent`, { amount });
  }
}
