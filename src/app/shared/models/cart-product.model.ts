import { TSHIRT_JACKETS_PANTS } from '../constants/clothing-sizes.constant';

export class CartProduct {
  id: number;
  productId?: number;
  name: string;
  quantity: number;
  unitPrice: number;
  pictureUrl: string;
  clothingSizeType: number;
  size: number;

  constructor(productId: number, quantity: number, size: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.size = size;
  }
}
