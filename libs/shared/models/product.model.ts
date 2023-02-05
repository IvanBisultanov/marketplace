import { EntityStatus } from './entity-status.model';

export interface Product extends EntityStatus {
  id: string;
  img: string;
  title: string;
  price: {
    value: number;
    currency: string;
  };
  available: boolean;
}
