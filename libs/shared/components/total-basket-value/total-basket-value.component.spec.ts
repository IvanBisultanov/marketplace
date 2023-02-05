import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBasketValueComponent } from './total-basket-value.component';

describe('TotalBasketValueComponent', () => {
  let component: TotalBasketValueComponent;
  let fixture: ComponentFixture<TotalBasketValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalBasketValueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalBasketValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
