import { CartProductBase } from "./cart-product-base.model";

export interface CartProduct extends CartProductBase {
  id?: number;
  name?: string;
  unitPrice?: number;
  pictureUrl?: string;
  clothingSizeType?: number;
  stock?: number;

}
