import { MemberId } from './member';
import { Money } from './money';

export class Debt {
  constructor(
    public creditorId: MemberId,
    public debtorId: MemberId,
    public value: Money,
  ) {}
}
