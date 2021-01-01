import { Money } from './money';
import { UserId } from './user';
import { Debt } from './dept';
import { SplitStrategy } from './split-strategy/split-money.abstract.ts';
import { GroupId } from './group';

export type ExpenseId = string;

export class Expense {
  private _debtsList: Debt[];

  constructor(
    public readonly creditorId: UserId,
    public readonly money: Money,
    public readonly description: string,
    public readonly debtorsIds: UserId[],
    public readonly splitStrategy: SplitStrategy,
    public readonly groupId: GroupId,
    public readonly id?: ExpenseId,
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
