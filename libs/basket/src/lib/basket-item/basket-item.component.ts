import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '@ultra/models';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ultra-basket-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketItemComponent {
  @Input() public product?: Product;
  @Output() public removeFromBasket: EventEmitter<void> = new EventEmitter();
}
