import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../models';
import { PRODUCT_API_SERVICE_URL } from '../tokens';

@Injectable({ providedIn: 'root' })
export class ProductApiService {
  constructor(@Inject(PRODUCT_API_SERVICE_URL) private readonly apiUrl: string, private readonly http: HttpClient) {}

  public fetchProducts$(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  public fetchSelectedProducts$(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/selected-products`);
  }

  public addProduct$(id: Product['id']): Observable<void> {
    console.log(id);
    return this.http.patch<void>(`${this.apiUrl}/add-product/${id}`, null);
  }

  public deleteProduct$(id: Product['id']): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-product/${id}`);
  }
}
