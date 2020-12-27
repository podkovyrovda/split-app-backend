import { UserId } from './user';
import { Money } from './money';

export class EquallySplitStrategy implements SplitStrategy {
  split(paidBy: UserId, debtorsIds: UserId[], money: Money): Debt[] {
    const quantity = debtorsIds.length;

    return debtorsIds.map((debtorId) => {
      return new Debt(debtorId, paidBy, Money.divide(money, quantity));
    });
  }
}

export abstract class SplitStrategy {
  abstract split(paidBy: UserId, debtorsIds: UserId[], money: Money): Debt[];
}

export class Debt {
  constructor(
    public debtorId: UserId,
    public owesToId: UserId,
    public value: Money,
  ) {}
}
