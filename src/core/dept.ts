import { UserId } from './user';
import { Money } from './money';

export type DebtId = string;

export class Debt {
  constructor(
    public readonly creditorId: UserId,
    public readonly debtorId: UserId,
    public readonly money: Money,
    public readonly id?: DebtId,
  ) {}
}
