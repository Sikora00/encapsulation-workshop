import { defineFeature, loadFeature } from 'jest-cucumber';
import { Wallet } from '../../src/wallet';
import { Money } from '../../src/money';
import { Either, isLeft, isRight } from 'fp-ts/Either';
import { eitherToThrow } from '../../src/utils/either-to-throw';

const feature = loadFeature('shop/specs/features/withdraw-money.feature');

defineFeature(feature, (test) => {
  test('Withdraw money from the wallet', ({ given, when, then, and }) => {
    let wallet: Wallet;
    let result: Money;
    given('There is a wallet with $5', () => {
      wallet = new Wallet(eitherToThrow(Money.new(5)));
    });

    when('I withdraw the money $2 from the wallet', () => {
      result = eitherToThrow(wallet.withdraw(eitherToThrow(Money.new(2))));
    });

    then('I have $2 in money', () => {
      expect(result).toMatchObject(eitherToThrow(Money.new(2)));
    });

    and('$3 is left in the wallet', () => {
      expect(wallet).toMatchObject(new Wallet(eitherToThrow(Money.new(3))));
    });
  });

  test('Can not withdraw money from the wallet if there is not enough founds', ({
    given,
    when,
    then,
  }) => {
    let wallet: Wallet;
    let result: Either<Error, Money>;
    given('There is a wallet with $5', () => {
      wallet = new Wallet(eitherToThrow(Money.new(5)));
    });

    when('I withdraw the money $6 from the wallet', () => {
      result = wallet.withdraw(eitherToThrow(Money.new(6)));
    });

    then('I see message "You have not enough money in your wallet."', () => {
      if (isRight(result)) {
        fail('withdraw should be impossible');
      }
      expect(result.left.message).toBe(
        'You have not enough money in your wallet.'
      );
    });
  });
});
