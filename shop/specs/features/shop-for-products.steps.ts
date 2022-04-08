import { defineFeature, DefineStepFunction, loadFeature } from 'jest-cucumber';
import { Product } from '../../src/product';
import { eitherToThrow } from '../../src/utils/either-to-throw';
import { Money } from '../../src/money';
import { Shop } from '../../src/shop';
import { BankAccount } from '../../src/bank-account';
import { Customer } from '../../src/customer';
import { Wallet } from '../../src/wallet';
import { Either } from 'fp-ts/Either';

const feature = loadFeature('shop/specs/features/shop-for-products.feature');

defineFeature(feature, (test) => {
  let redApple: Product;
  let shop: Shop;

  const givenThereIsRedApply = (given: DefineStepFunction) => {
    given('There is "red apple" with sku "1" and the price $1', () => {
      redApple = new Product('red apple', eitherToThrow(Money.new(1)));
    });
  };

  const andThereIsAShop = (and: DefineStepFunction) => {
    and('There is a shop with $0 on the bank account', () => {
      shop = new Shop(new BankAccount(eitherToThrow(Money.new(0))));
    });
  };

  test('Sell products to customers', ({ given, when, then, and }) => {
    let customer: Customer;

    givenThereIsRedApply(given);
    andThereIsAShop(and);
    given('There is a shop with 1 red apple in the stock', () => {
      shop.receiveInStock(redApple);
    });

    and('I am a customer', () => {
      customer = new Customer(
        'Maciej Sikorski',
        new Wallet(eitherToThrow(Money.new(10)))
      );
    });

    when('I buy red apple from the shop', () => {
      shop.buy(redApple, customer);
    });

    then('Shop have $1 on the bank account', () => {
      expect(shop).toMatchObject({
        bankAccount: new BankAccount(eitherToThrow(Money.new(1))),
      });
    });

    and('Shop have 0 red apples in the stock', () => {
      expect(shop).toMatchObject({ stock: [] });
    });
  });

  test('Can not buy if product is out of stock', ({
    given,
    when,
    then,
    and,
  }) => {
    let customer: Customer;
    let result: Either<Error, unknown>;
    givenThereIsRedApply(given);
    andThereIsAShop(and);
    given('There is a shop with 0 red apples in the stock', () => {});

    and('I am a customer', () => {
      customer = new Customer(
        'Maciej Sikorski',
        new Wallet(eitherToThrow(Money.new(10)))
      );
    });

    when('I buy red apple from the shop', () => {
      result = shop.buy(redApple, customer);
    });

    then(
      'I see error "There is no red apple available right now to buy"',
      () => {
        expect(result).toMatchObject({
          left: { message: 'There is no red apple available right now to buy' },
        });
      }
    );
  });
});
