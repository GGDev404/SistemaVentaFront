import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaleDTO } from '../Interface/sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'http://localhost:5225/api/CreateSale';

  constructor(private http: HttpClient) {}

  createSale(saleDto: SaleDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, saleDto);
  }
}
