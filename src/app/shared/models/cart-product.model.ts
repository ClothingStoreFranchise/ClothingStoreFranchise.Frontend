import { TSHIRT_JACKETS_PANTS } from '../constants/clothing-sizes.constant';

export class CartProduct {
  id?: number;
  name: string;
  quantity: number;
  unitPrice: number;
  pictureUrl: string;
  clothingSizeType: number;
  size: number;

  constructor(id: number, quantity: number, size: number) {
    this.id = id;
    this.quantity = quantity;
    this.size = size;
  }
}
