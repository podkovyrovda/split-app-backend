import { Expense } from './expense';
import { MemberId } from './member';
import { Money } from './money';
import { Debt } from './dept';

export class ExpensesList {
  private readonly _expenses: Expense[] = [];

  get expenses(): Expense[] {
    return this._expenses;
  }

  addExpense(expense: Expense) {
    this.expenses.push(expense);
    return this;
  }

  // debit - то, что должны нам, те долги, в которых мы кредитор
  // credit - то, что должны мы, те долги, в которых ма дебитор
  private _getUserDebitCredit(userId): { debit: Debt[]; credit: Debt[] } {
    return this.expenses.reduce(
      (acc, expense) => {
        expense.debtsList.forEach((debt) => {
          if (debt.creditorId === userId) {
            acc.debit.push(debt);
          }

          if (debt.debtorId === userId) {
            acc.credit.push(debt);
          }
        });

        return acc;
      },
      { debit: [], credit: [] } as { debit: Debt[]; credit: Debt[] },
    );
  }

  public calculateUserBalance(userId: MemberId, filterByUserId?: MemberId) {
    const { debit, credit } = this._getUserDebitCredit(userId);

    const debitSum = debit
      .filter((debt) =>
        filterByUserId ? debt.debtorId === filterByUserId : true,
      )
      .map((debt) => debt.value)
      .reduce(Money.sum, Money.ZERO('rub'));

    const creditSum = credit
      .filter((debt) =>
        filterByUserId ? debt.creditorId === filterByUserId : true,
      )
      .map((debt) => debt.value)
      .reduce(Money.sum, Money.ZERO('rub'));

    return Money.sum(debitSum, creditSum.negate());
  }
}
