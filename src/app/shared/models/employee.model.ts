import { User } from './user.model';

export interface Employee extends User {
  username: string,
  firstName: string,
  lastName: string,
  address: string,
  email: string,
  accountNumber: string,
  sSecurityNumber: string
  salary: number,
  warehouseId: number,
  shopId: number
}
