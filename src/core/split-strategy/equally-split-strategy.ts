import { MemberId } from '../member';
import { Money } from '../money';
import { Debt } from '../dept';
import { SplitStrategy } from './split-strategy.abstract.ts';

export class EquallySplitStrategy implements SplitStrategy {
  split(creditorId: MemberId, money: Money, debtorIds: MemberId[]): Debt[] {
    return debtorIds.map(
      (debtorId) =>
        new Debt(creditorId, debtorId, Money.divide(money, debtorIds.length)),
    );
  }
}
