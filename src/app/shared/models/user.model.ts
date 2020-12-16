import { ROLES } from '../constants/roles.constant';

export interface User {
  id?: number;
  username?: string;
  password?: string;
  role?: ROLES;
}
