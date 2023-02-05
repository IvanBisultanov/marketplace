import { Action } from '@ngrx/store';

import { Deposit } from '@ultra/models';

import { WealthActions } from './wealth.actions';
import { initialWealthState, wealthReducer, WealthState } from './wealth.reducer';

describe('Deposit Reducer', () => {
  const createDepositEntity = (value: number): { deposit: Deposit } => ({
    deposit: {
      value,
      currency: '',
      loaded: false,
      pending: false,
      error: false,
    },
  });

  describe('valid Deposit actions', () => {
    it('loadDepositSuccess should return the list of known Deposit', () => {
      const action = WealthActions.loadDepositSuccess(createDepositEntity(190));

      const result: WealthState = wealthReducer(initialWealthState, action);

      expect(result.deposit.loaded).toBe(true);
      expect(result.deposit.value).toBe(190);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = wealthReducer(initialWealthState, action);

      expect(result).toBe(initialWealthState);
    });
  });
});
