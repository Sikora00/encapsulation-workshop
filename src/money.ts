import { Either, left, right } from 'fp-ts/Either';
import { NegativeMoneyAmountError } from './errors/negative-money-amount.error';

export class Money {
  // amount in $
  private constructor(private readonly amount: number) {
    if (amount < 0) {
      throw new NegativeMoneyAmountError();
    }
  }

  static new(amount: number): Either<NegativeMoneyAmountError, Money> {
    try {
      return right(new Money(amount));
    } catch (e) {
      return left(e);
    }
  }

  subtract(money: Money): Either<NegativeMoneyAmountError, Money> {
    return Money.new(this.amount - money.amount);
  }

  add(money: Money): Money {
    return new Money(this.amount + money.amount);
  }
}
