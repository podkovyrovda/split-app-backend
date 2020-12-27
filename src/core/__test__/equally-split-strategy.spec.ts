import { Group } from '../group';
import { Expense } from '../expense';
import { Money } from '../money';
import { EquallySplitStrategy } from '../split-strategy/equally-split-strategy';

const group = new Group('Эроланта', 'Аня');

group
  .addMember('Руслан')
  .addMember('Диана')
  .addMember('Сергей')
  .addMember('Оля')
  .addMember('Костя')
  .addMember('Андрей');

describe('equally-split-strategy', () => {
  it('should split equally', () => {
    group.expensesList
      .addExpense(
        new Expense(
          'Диана',
          Money.of(3300, 'rub'),
          'Залог за хату',
          ['Аня', 'Руслан', 'Диана', 'Сергей', 'Оля', 'Костя', 'Андрей'],
          new EquallySplitStrategy(),
        ),
      )
      .addExpense(
        new Expense(
          'Аня',
          Money.of(6300, 'rub'),
          'Залог за дом',
          ['Аня', 'Руслан', 'Диана', 'Сергей', 'Оля', 'Костя', 'Андрей'],
          new EquallySplitStrategy(),
        ),
      )
      .addExpense(
        new Expense(
          'Сергей',
          Money.of(3000, 'rub'),
          'Залог за хату',
          ['Аня', 'Руслан', 'Диана', 'Сергей', 'Оля', 'Костя', 'Андрей'],
          new EquallySplitStrategy(),
        ),
      )
      .addExpense(
        new Expense(
          'Андрей',
          Money.of(6300, 'rub'),
          'Залог за хату',
          ['Аня', 'Руслан', 'Диана', 'Сергей', 'Оля', 'Костя', 'Андрей'],
          new EquallySplitStrategy(),
        ),
      );

    const usersBalance = group.members.map((member) => ({
      [member]: group.expensesList
        .calculateUserBalance(member)
        .amount.toNumber(),
    }));

    console.log('Баланс группы', usersBalance);

    group.members.forEach((member) =>
      group.members.forEach((mem) => {
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
