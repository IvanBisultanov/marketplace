import { Action, createReducer, on } from '@ngrx/store';

import { CheckoutStatus, Deposit } from '@ultra/models';

import { WealthActions } from './wealth.actions';

export const WEALTH_FEATURE_KEY = 'wealth';

export interface WealthState {
  deposit: Deposit;
  checkout: CheckoutStatus;
}

export interface WealthPartialState {
  readonly [WEALTH_FEATURE_KEY]: WealthState;
}

export const initialWealthState: WealthState = {
  deposit: {
    value: 0,
    currency: '',
    loaded: false,
    pending: false,
    error: false,
  },
  checkout: {
    success: false,
    error: false,
    pending: false,
  },
};

const reducer = createReducer(
  initialWealthState,
  on(WealthActions.loadDeposit, (state) => ({
    ...state,
    deposit: {
      ...state.deposit,
      pending: true,
      loaded: false,
      error: false,
    },
  })),
  on(WealthActions.loadDepositSuccess, (state, { deposit }) => ({
    ...state,
    deposit: {
      ...deposit,
      pending: false,
      loaded: true,
      error: false,
    },
  })),
  on(WealthActions.loadDepositError, (state) => ({
    ...state,
    deposit: {
      ...state.deposit,
      loaded: false,
      pending: false,
      error: true,
    },
  })),

  on(WealthActions.resetCheckout, (state) => ({
    ...state,
    checkout: {
      pending: false,
      success: false,
      error: false,
    },
  })),
  on(WealthActions.checkout, (state) => ({
    ...state,
    checkout: {
      pending: true,
      success: false,
      error: false,
    },
  })),
  on(WealthActions.checkoutResponse, (state, { checkoutResponse }) => ({
    ...state,
    deposit: {
      ...state.deposit,
      ...checkoutResponse.deposit,
    },
    checkout: {
      pending: false,
      success: checkoutResponse.success,
      error: false,
    },
  })),
  on(WealthActions.checkoutError, (state) => ({
    ...state,
    checkout: {
      pending: false,
      success: false,
      error: true,
    },
  }))
);

export function wealthReducer(state: WealthState | undefined, action: Action) {
  return reducer(state, action);
}
