import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CheckoutForm, CheckoutResponse, Deposit } from '@ultra/models';

export const WealthActions = createActionGroup({
  source: 'Wealth/API',
  events: {
    'Load Deposit': emptyProps(),
    'Load Deposit Success': props<{ deposit: Deposit }>(),
    'Load Deposit Error': emptyProps(),
    Checkout: props<{ checkoutForm: CheckoutForm }>(),
    'Checkout Response': props<{ checkoutResponse: CheckoutResponse }>(),
    'Checkout Error': emptyProps(),
    'Reset Checkout': emptyProps(),
  },
});
