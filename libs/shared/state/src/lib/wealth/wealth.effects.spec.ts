import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { Observable, of } from 'rxjs';

import { WealthApiService } from '@ultra/api';

import { WealthEffects } from './wealth.effects';
import { WealthActions } from './wealth.actions';

describe('WealthEffects', () => {
  let effects: WealthEffects;
  let wealthApiService: WealthApiService;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        {
          provide: WealthApiService,
          useValue: {
            fetchDeposit$: jest.fn(),
          },
        },
        WealthEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(WealthEffects);
    wealthApiService = TestBed.inject(WealthApiService);
  });

  describe('fetchDeposit$', () => {
    it('should work', () => {
      const action: TypedAction<string> = WealthActions.loadDeposit();
      const result: TypedAction<string> = WealthActions.loadDepositSuccess({
        deposit: {
          value: 200,
          currency: '$',
        },
      });

      actions$ = of(action);
      const response: TestColdObservable = cold('-a', {
        a: {
          value: 200,
          currency: '$',
        },
      });
      const expected: TestColdObservable = cold('-b', { b: result });

      jest.spyOn(wealthApiService, 'fetchDeposit$').mockReturnValue(response);

      expect(effects.loadDeposit$).toBeObservable(expected);
    });
  });
});
