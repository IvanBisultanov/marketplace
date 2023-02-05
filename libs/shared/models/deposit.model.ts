import { EntityStatus } from './entity-status.model';

export interface DepositResponse {
  value: number;
  currency: string;
}

export type Deposit = EntityStatus & DepositResponse;
