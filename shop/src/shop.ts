import { BankAccount } from './bank-account';
import { Product } from './product';
import { Customer } from './customer';
import { Either, isRight, left, right } from 'fp-ts/Either';
import { ProductNotFoundInStockError } from './errors/product-not-found-in-stock.error';
import { NotEnoughMoneyToBuyProductError } from './errors/not-enough-money-to-buy-product.error';

export class Shop {
  constructor(
    private readonly bankAccount: BankAccount,
    private readonly stock: Product[] = []
  ) {}

  receiveInStock(product: Product): void {
    this.stock.push(product);
  }

  buy(
    product: Product,
    customer: Customer
  ): Either<
    ProductNotFoundInStockError | NotEnoughMoneyToBuyProductError,
    null
  > {
    const productInStockIndex = this.stock.findIndex((pr) =>
      product.equals(pr)
    );
    if (productInStockIndex !== -1) {
      const maybeMoney = product.sell(customer);
      if (isRight(maybeMoney)) {
        this.stock.splice(productInStockIndex, 1);
        this.bankAccount.fund(maybeMoney.right);
        return right(null);
      } else {
        return maybeMoney;
      }
    }
    return left(new ProductNotFoundInStockError(product));
  }
}
