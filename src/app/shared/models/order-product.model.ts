import { Order } from './order.model';

export interface OrderProduct {
  productId: number,
  name: string,
  pictureUrl: string,
  unitPrice: number,
  size: number,
  quantity: number,
  state?: number,
  warehouseId?: number,
  order?: Order
}
