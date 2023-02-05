import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'ultra-site-footer',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooterComponent implements AfterViewInit {
  constructor(private readonly snackBar: MatSnackBar) {}
  public disclaimer(): void {
    this.snackBar.open(
      `
        Assuming BE will share deposit and prices in the same currency.
        Assuming the user has 1 active session.
      `,
      'Ok'
    );
  }

  public ngAfterViewInit(): void {
    this.disclaimer();
  }
}
