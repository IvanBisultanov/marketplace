import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { productsReducer, wealthReducer } from '@ultra/shared/state';

import { BasketShellComponent } from './basket-shell.component';

describe('BasketShellComponent', () => {
  let component: BasketShellComponent;
  let fixture: ComponentFixture<BasketShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        BasketShellComponent,
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

    fixture = TestBed.createComponent(BasketShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
