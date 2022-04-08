import { Product } from '../product';

export class ProductNotFoundInStockError extends Error {
  constructor(product: Product) {
    super(`There is no ${product} available right now to buy`);
  }
}
