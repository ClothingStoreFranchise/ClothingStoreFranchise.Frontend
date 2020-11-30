import { Employee } from './employee.model';
import { Stock } from './stock.model';

export class Warehouse {
  address: string;
  id: number;
  phone: string;
  warehouseStocks: Stock[];
  isExpanded: boolean = false;
  employeeCount: number;
  warehouseEmployees: Employee[];
}
