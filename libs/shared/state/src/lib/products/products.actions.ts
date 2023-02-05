import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '@ultra/models';

export const ProductsActions = createActionGroup({
  source: 'Products/API',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Error': emptyProps(),
    'Reset Products': emptyProps(),
    'Reset Selected Products': emptyProps(),
    'Load Selected Products': emptyProps(),
    'Load Selected Products Success': props<{ products: Product[] }>(),
    'Load Selected Products Error': emptyProps(),
    'Add Product': props<{ product: Product }>(),
    'Add Product Success': props<{ product: Product }>(),
    'Add Product Error': props<{ product: Product }>(),
    'Delete Product': props<{ product: Product }>(),
    'Delete Product Success': props<{ product: Product }>(),
    'Delete Product Error': props<{ product: Product }>(),
  },
});
