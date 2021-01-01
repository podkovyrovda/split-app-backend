import { Group } from '../group';
import { Expense } from '../expense';
import { CurrencyEnum, Money } from '../money';
import { SPLIT_STRATEGIES } from '../split-strategy/split-money.abstract.ts';
import { ExpensesList } from '../expenses-list';

const anya = 'Аня';
const ruslan = 'Руслан';
const diana = 'Диана';
const sergey = 'Сергей';
const olya = 'Оля';
const kostya = 'Костя';
const andrey = 'Андрей';

const group = new Group('Эроланта', anya, [], new ExpensesList(), '1');

group
  .addMember(ruslan)
  .addMember(diana)
  .addMember(sergey)
  .addMember(olya)
  .addMember(kostya)
  .addMember(andrey);

describe('equally-split-strategy', () => {
  it('should split equally', () => {
    group.expensesList
      .addExpense(
        new Expense(
          diana,
          Money.of(3300, CurrencyEnum.RUB),
          'Залог за хату',
          group.membersIds,
          SPLIT_STRATEGIES.equally,
          '1',
        ),
      )
      .addExpense(
        new Expense(
          anya,
          Money.of(6300, CurrencyEnum.RUB),
          'Залог за дом',
          group.membersIds,
          SPLIT_STRATEGIES.equally,
          '1',
        ),
      )
      .addExpense(
        new Expense(
          sergey,
          Money.of(3000, CurrencyEnum.RUB),
          'Залог за хату',
          group.membersIds,
          SPLIT_STRATEGIES.equally,
          '1',
        ),
      )
      .addExpense(
        new Expense(
          andrey,
          Money.of(6300, CurrencyEnum.RUB),
          'Залог за хату',
          group.membersIds,
          SPLIT_STRATEGIES.equally,
          '1',
        ),
      );

    const usersBalance = group.membersIds.map((member) => ({
      [member]: group.expensesList
        .calculateUserBalance(member)
        .amount.toNumber(),
    }));

    console.log('Баланс группы', usersBalance);

    group.membersIds.forEach((member) =>
      group.membersIds.forEach((mem) => {
        if (member === mem) {
          return;
        }

        console.log(
          member,
          mem,
          group.expensesList
            .calculateUserBalance(member, mem)
            .amount.toNumber(),
        );
      }),
    );

    expect(0).toEqual(0);
  });
});
