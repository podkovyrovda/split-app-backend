import { BigNumber } from 'bignumber.js';

export enum CurrencyEnum {
  RUB = 'RUB',
}

BigNumber.config({
  DECIMAL_PLACES: 2,
});

export class Money {
  constructor(
    public readonly amount: BigNumber,
    public readonly currency: CurrencyEnum,
  ) {}

  static ZERO(currency: CurrencyEnum) {
    return new Money(new BigNumber(0), currency);
  }

  static of(value: number, currency: CurrencyEnum) {
    return new Money(new BigNumber(value), currency);
  }

  static sum(a: Money, b: Money): Money {
    return new Money(a.amount.plus(b.amount), a.currency);
  }

  static divide(a: Money, divider: number): Money {
    return new Money(a.amount.div(new BigNumber(divider)), a.currency);
  }

  negate() {
    return new Money(this.amount.negated(), this.currency);
  }
}
