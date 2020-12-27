import { Money } from './money';
import { UserId } from './user';
import { Debt, SplitStrategy } from './split-strategy';

export class Expense {
  private _debtList: Debt[];

  constructor(
    public readonly paidById: UserId,
    public readonly money: Money,
    public readonly description: string,
    public readonly splitBy: UserId[],
    public readonly splitStrategy: SplitStrategy,
  ) {
    this._split();
  }

  get debtList(): Debt[] {
    return this._debtList;
  }

  private _split(): void {
    this._debtList = this.splitStrategy.split(
      this.paidById,
      this.splitBy,
      this.money,
    );
  }
}
