import { UserId } from './user';
import { ExpensesList } from './expenses-list';

export type GroupId = string;

export class Group {
  constructor(
    public readonly name: string,
    public readonly ownerId: UserId,
    public readonly membersIds: UserId[] = [],
    public readonly expensesList: ExpensesList = new ExpensesList(),
    public readonly id?: GroupId,
  ) {
    if (membersIds.length === 0) {
      this.membersIds.push(ownerId);
    }
  }

  addMember(userId: UserId): Group {
    this.membersIds.push(userId);

    return this;
  }
}
