import { Expense } from './expense';
import { Debt } from './split-strategy';
import { UserId } from './user';
import { Money } from './money';

export class ExpenseList {
  private readonly _expenses: Expense[] = [];

  get expenses(): Expense[] {
    return this._expenses;
  }

  addExpense(expense: Expense) {
    this.expenses.push(expense);
    return this;
  }

  private _getUserDebitCredit(userId): { debit: Debt[]; credit: Debt[] } {
    const debts = this.expenses.reduce(
      (acc, expense) => [...acc, ...expense.debtList],
      [] as Debt[],
    );

    return {
      debit: debts.filter(
        (debt) => debt.owesToId === userId && debt.debtorId !== userId,
      ),
      credit: debts.filter(
        (debt) => debt.debtorId === userId && debt.owesToId !== userId,
      ),
    };
  }

  public calculateUserBalance(userId: UserId, filterByUserId?: UserId) {
    const { debit, credit } = this._getUserDebitCredit(userId);

    const debitSum = debit
      .filter((debt) =>
        filterByUserId ? debt.debtorId === filterByUserId : true,
      )
      .map((debt) => debt.value)
      .reduce(Money.sum, Money.ZERO('rub'));

    const creditSum = credit
      .filter((debt) =>
        filterByUserId ? debt.owesToId === filterByUserId : true,
      )
      .map((debt) => debt.value)
      .reduce(Money.sum, Money.ZERO('rub'));

    return Money.sum(debitSum, creditSum.negate());
  }
}
