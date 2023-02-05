import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Deposit, Product } from '../../models';
import { TotalPricePipe } from '../../pipes';

@Component({
  selector: 'ultra-total-basket-value',
  standalone: true,
  imports: [CommonModule, TotalPricePipe],
  templateUrl: './total-basket-value.component.html',
  styleUrls: ['./total-basket-value.component.scss'],
})
export class TotalBasketValueComponent {
  @Input() public deposit: Deposit | null = null;
  @Input() public selectedProducts: Product[] | null = null;
}
