import { Money } from './money';
import { MemberId } from './member';
import { Debt } from './dept';
import { SplitStrategy } from './split-strategy/split-strategy.abstract.ts';

export class Expense {
  private _debtsList: Debt[];

  constructor(
    public readonly creditorId: MemberId,
    public readonly money: Money,
    public readonly description: string,
    public readonly debtorsIds: MemberId[],
    public readonly splitStrategy: SplitStrategy,
  ) {
    this._split();
  }

  get debtsList(): Debt[] {
    return this._debtsList;
  }

  private _split(): void {
    this._debtsList = this.splitStrategy.split(
      this.creditorId,
      this.money,
      this.debtorsIds,
    );
  }
}
