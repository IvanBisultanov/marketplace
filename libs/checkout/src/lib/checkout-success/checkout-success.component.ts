import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ultra-checkout-success',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutSuccessComponent {}
