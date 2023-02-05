import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CheckoutForm, CheckoutResponse, DepositResponse } from '../models';
import { PRODUCT_API_SERVICE_URL } from '../tokens';

@Injectable({ providedIn: 'root' })
export class WealthApiService {
  constructor(
    @Inject(PRODUCT_API_SERVICE_URL) private readonly apiUrl: string,
    private readonly http: HttpClient
  ) {}

  public fetchDeposit$(): Observable<DepositResponse> {
    return this.http.get<DepositResponse>(`${this.apiUrl}/deposit`);
  }

  public checkout$(checkoutForm: CheckoutForm): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(`${this.apiUrl}/checkout`, checkoutForm);
  }
}
