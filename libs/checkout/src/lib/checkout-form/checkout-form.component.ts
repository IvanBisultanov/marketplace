import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TotalBasketValueComponent } from '@ultra/components';
import { CheckoutForm, CheckoutStatus, Deposit, Product } from '@ultra/models';
import { TotalPricePipe } from '@ultra/pipes';
import { EMAIL_REGEX } from '@ultra/regex';
import { trimRequiredValidator } from '@ultra/validators';

@Component({
  selector: 'ultra-checkout-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TotalBasketValueComponent,
    TotalPricePipe,
  ],
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent {
  @Input() public checkoutStatus: CheckoutStatus | null = null;
  @Input() public deposit: Deposit | null = null;
  @Input() public selectedProducts: Product[] | null = null;
  @Output() public checkout: EventEmitter<CheckoutForm> = new EventEmitter();

  public form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, trimRequiredValidator]],
    lastName: ['', [Validators.required, trimRequiredValidator]],
    street: ['', [Validators.required, trimRequiredValidator]],
    city: ['', [Validators.required, trimRequiredValidator]],
    state: ['', [Validators.required, trimRequiredValidator]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(254)],
    ],
  });
  readonly urlPattern = EMAIL_REGEX;

  constructor(private readonly fb: FormBuilder) {}
}
