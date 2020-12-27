import { UserId } from './user';
import { ExpenseList } from './expense.list';

export class Group {
  constructor(
    public readonly name: string,
    public readonly ownerId: UserId,
    public readonly members: UserId[] = [],
    public readonly expenseList: ExpenseList = new ExpenseList(),
  ) {
    this.addMember(ownerId);
  }

  addMember(userId: UserId): Group {
    this.members.push(userId);
    return this;
  }
}
