import { Money } from './money';
import { Either, isLeft, left, right } from 'fp-ts/Either';
import { NotEnoughMoneyInWalletError } from './errors/not-enough-money-in-wallet.error';

export class Wallet {
  constructor(private money: Money) {}

  withdraw(money: Money): Either<NotEnoughMoneyInWalletError, Money> {
    const result = this.money.subtract(money);
    if (isLeft(result)) {
      return left(new NotEnoughMoneyInWalletError());
    } else {
      this.money = result.right;
    }
    return right(money);
  }

  fund(money: Money): void {
    this.money = this.money.add(money);
  }
}
