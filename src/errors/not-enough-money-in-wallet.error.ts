export class NotEnoughMoneyInWalletError extends Error {
  constructor() {
    super('You have not enough money in your wallet.');
  }
}
