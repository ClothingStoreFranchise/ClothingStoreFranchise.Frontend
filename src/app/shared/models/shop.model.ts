import { Employee } from './employee.model';
import { Stock } from './stock.model';

export class Shop {
  address: string;
  id: number;
  phone: string;
  shopStocks: Stock[];
  isExpanded: boolean = false;
  employeeCount: number;
  shopEmployees: Employee[];
}
