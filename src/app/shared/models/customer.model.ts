import { CartProduct } from './cart-product.model';
import { User } from './user.model'

export interface Customer extends User {
  lastName: string;
  name: string;
  address: string;
  country: string;
  phoneNumber: string;
  email: string;
  cart: CartProduct[];
}
