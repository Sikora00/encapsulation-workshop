import { Money } from './money';
import { Customer } from './customer';
import { NotEnoughMoneyInWalletError } from './errors/not-enough-money-in-wallet.error';
import { Either, isLeft, left } from 'fp-ts/Either';
import { SoldProduct } from './sold-product';
import { NotEnoughMoneyToBuyProductError } from './errors/not-enough-money-to-buy-product.error';

export class Product {
  constructor(private readonly name: string, private readonly price: Money) {}

  equals(product: Product): boolean {
    return this.name === product.name;
  }

  sell(customer: Customer): Either<NotEnoughMoneyToBuyProductError, Money> {
    const buy = customer.buy(new SoldProduct(this.name), this.price);
    if (isLeft(buy)) {
      return left(new NotEnoughMoneyToBuyProductError());
    }
    return buy;
  }

  toString(): string {
    return this.name;
  }
}
