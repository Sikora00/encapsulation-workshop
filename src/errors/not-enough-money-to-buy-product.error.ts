export class NotEnoughMoneyToBuyProductError extends Error {
  constructor() {
    super('You have not enough money to buy it');
  }
}
