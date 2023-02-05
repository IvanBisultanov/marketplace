import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEALTH_FEATURE_KEY, WealthState } from './wealth.reducer';

export const selectWealthState = createFeatureSelector<WealthState>(WEALTH_FEATURE_KEY);

const selectWealthDeposit = createSelector(
  selectWealthState,
  (state: WealthState) => state.deposit
);

const selectWealthCheckout = createSelector(
  selectWealthState,
  (state: WealthState) => state.checkout
);

export const WealthSelectors = {
  selectWealthState,
  selectWealthDeposit,
  selectWealthCheckout,
};
