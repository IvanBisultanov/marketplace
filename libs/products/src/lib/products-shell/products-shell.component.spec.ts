import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { productsReducer, wealthReducer } from '@ultra/shared/state';

import { ProductsShellComponent } from './products-shell.component';

describe('ProductsShellComponent', () => {
  let component: ProductsShellComponent;
  let fixture: ComponentFixture<ProductsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        ProductsShellComponent,
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

    fixture = TestBed.createComponent(ProductsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
