import { CartProduct } from './cart-product.model';
import { User } from './user.model'

export interface Customer extends User{
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  phoneNumber: string;
  email: string;
  cartProducts?: CartProduct[];
}
