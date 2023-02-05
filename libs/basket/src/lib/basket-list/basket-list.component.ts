import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketItemComponent } from '../basket-item/basket-item.component';
import { Product } from '@ultra/models';

@Component({
  selector: 'ultra-basket-list',
  standalone: true,
  imports: [BasketItemComponent, CommonModule],
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketListComponent {
  @Input() public products: Product[] | null = null;
  @Output() public removeFromBasket: EventEmitter<Product> = new EventEmitter();

  public trackById(_: number, project: Product): string {
    return project.id;
  }
}
