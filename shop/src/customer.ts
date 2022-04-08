import { Wallet } from './wallet';
import { Money } from './money';
import { eitherToThrow } from './utils/either-to-throw';
import { Product } from './product';
import { SoldProduct } from './sold-product';
import { Either, isRight, Left } from 'fp-ts/Either';
import { NotEnoughMoneyInWalletError } from './errors/not-enough-money-in-wallet.error';

export class Customer {
  constructor(
    private readonly fullName: string,
    private readonly wallet = new Wallet(eitherToThrow(Money.new(0))),
    private readonly products: SoldProduct[] = []
  ) {}

  getMoney(money: Money): void {
    this.wallet.fund(money);
  }

  buy(
    product: SoldProduct,
    price: Money
  ): Either<NotEnoughMoneyInWalletError, Money> {
    const withdrawResult = this.wallet.withdraw(price);
    if (isRight(withdrawResult)) {
      this.products.push(product);
    }
    return withdrawResult;
  }
}
