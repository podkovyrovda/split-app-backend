import { UserId } from '../user';
import { Money } from '../money';
import { Debt } from '../dept';
import { SplitStrategy, SplitStrategyEnum } from './split-money.abstract.ts';

export class EquallySplitStrategy implements SplitStrategy {
  type: SplitStrategyEnum = SplitStrategyEnum.EQUALLY;

  split(creditorId: UserId, money: Money, debtorsIds: UserId[]): Debt[] {
    return debtorsIds.map((debtor) => {
      return new Debt(
        creditorId,
        debtor,
        Money.divide(money, debtorsIds.length),
      );
    });
  }
}
