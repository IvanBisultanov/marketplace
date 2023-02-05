import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { productsReducer, wealthReducer } from '@ultra/shared/state';

import { CheckoutShellComponent } from './checkout-shell.component';

describe('CheckoutShellComponent', () => {
  let component: CheckoutShellComponent;
  let fixture: ComponentFixture<CheckoutShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        CheckoutShellComponent,
        StoreModule.forRoot(
          {
            products: productsReducer,
            wealth: wealthReducer,
          },
          {
            metaReducers: [],
            runtimeChecks: {
              strictActionImmutability: true,
              strictStateImmutability: true,
            },
          }
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
