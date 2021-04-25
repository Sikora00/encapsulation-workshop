import { defineFeature, loadFeature } from 'jest-cucumber';
import { Product } from '../../src/product';
import { eitherToThrow } from '../../src/utils/either-to-throw';
import { Money } from '../../src/money';
import { Customer } from '../../src/customer';
import { Wallet } from '../../src/wallet';
import { SoldProduct } from '../../src/sold-product';
import { Either } from 'fp-ts/Either';
import { NotEnoughMoneyToBuyProductError } from '../../src/errors/not-enough-money-to-buy-product.error';

const feature = loadFeature('specs/features/buying-products.feature');

defineFeature(feature, (test) => {
  test('Customer by product he is afford to.', ({ given, when, then, and }) => {
    let customer: Customer;
    let product: Product;
    given('There is a product called "red apple" that cost $1', () => {
      product = new Product('red apple', eitherToThrow(Money.new(1)));
    });

    and('I am "John Doe"', () => {
      customer = new Customer('John Doe');
    });

    and('I have $10 in my wallet', () => {
      customer.getMoney(eitherToThrow(Money.new(10)));
    });

    when('I buy this product', () => {
      product.sell(customer);
    });

    then('I have this product on my products list', () => {
      expect(customer).toMatchObject({
        products: [new SoldProduct('red apple')],
      });
    });

    and('I have $9 left in the wallet', () => {
      expect(customer).toMatchObject({
        wallet: new Wallet(eitherToThrow(Money.new(9))),
      });
    });
  });

  test('Customer can not buy product when he have not enough money', ({
    given,
    when,
    then,
    and,
  }) => {
    let customer: Customer;
    let product: Product;
    let result: Either<NotEnoughMoneyToBuyProductError, unknown>;
    given('There is a product called "yellow pear" that cost $2', () => {
      product = new Product('yellow pear', eitherToThrow(Money.new(2)));
    });

    and('I am "John Doe"', () => {
      customer = new Customer('John Doe');
    });

    and('I have $1 in my wallet', () => {
      customer.getMoney(eitherToThrow(Money.new(1)));
    });

    when('I buy this product', () => {
      result = product.sell(customer);
    });

    then('I see message "You have not enough money to buy it"', () => {
      expect(result).toMatchObject({
        left: { message: 'You have not enough money to buy it' },
      });
    });
  });
});
