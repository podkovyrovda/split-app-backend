import { Expense } from './expense';
import { UserId } from './user';
import { CurrencyEnum, Money } from './money';
import { Debt } from './dept';

export class ExpensesList {
  private readonly _expenses: Expense[] = [];

  get expenses(): Expense[] {
    return this._expenses;
  }

  addExpense(...expenses: Expense[]) {
    expenses.forEach((expense) => this.expenses.push(expense));

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

  public calculateUserBalance(userId: UserId, filterByUserId?: UserId) {
    const { debit, credit } = this._getUserDebitCredit(userId);

    const debitSum = debit
      .filter((debt) =>
        filterByUserId ? debt.debtorId === filterByUserId : true,
      )
      .map((debt) => debt.money)
      .reduce(Money.sum, Money.ZERO(CurrencyEnum.RUB));

    const creditSum = credit
      .filter((debt) =>
        filterByUserId ? debt.creditorId === filterByUserId : true,
      )
      .map((debt) => debt.money)
      .reduce(Money.sum, Money.ZERO(CurrencyEnum.RUB));

    return Money.sum(debitSum, creditSum.negate());
  }
}
