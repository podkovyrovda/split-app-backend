import { MemberId } from '../member';
import { Money } from '../money';
import { Debt } from '../dept';

export abstract class SplitStrategy {
  abstract split(
    creditorId: MemberId,
    money: Money,
    debtorsIds: MemberId[],
  ): Debt[];
}
