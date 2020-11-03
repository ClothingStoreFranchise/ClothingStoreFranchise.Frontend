import { Product } from './product.model';

export interface Stock{
  shopId: number,
  warehouseId: number,
  product: Product,
  idSize: any,
  stock:number
}
