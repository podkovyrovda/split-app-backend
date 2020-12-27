import { MemberId } from './member';
import { ExpensesList } from './expenses-list';

export class Group {
  constructor(
    public readonly name: string,
    public readonly ownerId: MemberId,
    public readonly members: MemberId[] = [],
    public readonly expensesList: ExpensesList = new ExpensesList(),
  ) {
    this.addMember(ownerId);
  }

  addMember(userId: MemberId): Group {
    this.members.push(userId);
    return this;
  }
}
