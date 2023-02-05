import { Deposit } from './deposit.model';

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  email: string;
}

export interface CheckoutResponse {
  success: boolean;
  deposit: Deposit;
}

export interface CheckoutStatus {
  success: boolean;
  error: boolean;
  pending: boolean;
}
