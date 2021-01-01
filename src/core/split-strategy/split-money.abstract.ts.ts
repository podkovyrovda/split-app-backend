import { UserId } from '../user';
import { Money } from '../money';
import { Debt } from '../dept';
import { EquallySplitStrategy } from './equally-split-strategy';

export enum SplitStrategyEnum {
  EQUALLY = 'equally',
}

export const SPLIT_STRATEGIES: Record<SplitStrategyEnum, SplitStrategy> = {
  [SplitStrategyEnum.EQUALLY]: new EquallySplitStrategy(),
};

export abstract class SplitStrategy {
  abstract type: SplitStrategyEnum;

  abstract split(
    creditorId: UserId,
    money: Money,
    debtorsIds: UserId[],
  ): Debt[];
}
