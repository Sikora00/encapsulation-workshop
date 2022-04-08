import { Money } from './money';

export class BankAccount {
  constructor(private credit: Money) {}

  fund(money: Money): void {
    this.credit = this.credit.add(money);
  }
}
