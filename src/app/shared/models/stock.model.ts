import { Product } from './product.model';

export interface Stock{
  shopId: number,
  warehouseId: number,
  productId: number,
  product: Product,
  size: any,
  stock: number
}
