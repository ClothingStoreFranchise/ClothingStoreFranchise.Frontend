import { OrderProduct } from './order-product.model';

export interface Order {
  id?: number,
  customerId: number,
  address: string,
  card: string,
  date?: Date,
  orderProducts: OrderProduct[]
}
