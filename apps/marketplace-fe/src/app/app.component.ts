import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ultra-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'marketplace-fe';
}
