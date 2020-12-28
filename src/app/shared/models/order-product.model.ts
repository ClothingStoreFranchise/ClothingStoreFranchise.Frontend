import { Order } from './order.model';

export interface OrderProduct {
  id?: number,
  productId: number,
  name: string,
  pictureUrl: string,
  unitPrice: number,
  size: number,
  quantity: number,
  clothingSizeType: number,
  state?: number,
  warehouseId?: number,
  order?: Order
}
