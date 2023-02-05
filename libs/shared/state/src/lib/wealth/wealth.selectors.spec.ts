import { WealthPartialState, WealthSelectors } from '@ultra/shared/state';

describe('Deposit Selectors', () => {
  let state: WealthPartialState;

  beforeEach(() => {
    state = {
      wealth: {
        deposit: {
          value: 220,
          currency: '',
          loaded: false,
          pending: false,
          error: false,
        },
        checkout: {
          pending: false,
          success: false,
          error: true,
        },
      },
    };
  });

  describe('Deposit Selectors', () => {
    it('selectAllDeposit() should return the list of Deposit', () => {
      const result = WealthSelectors.selectWealthCheckout(state);

      expect(result.success).toBe(false);
    });

    it('selectDepositLoaded() should return the current "loaded" status', () => {
      const result = WealthSelectors.selectWealthDeposit(state);

      expect(result.value).toBe(220);
    });
  });
});
