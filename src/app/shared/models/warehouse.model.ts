import { Stock } from './stock.model';

export class Warehouse {
  address: string;
  id: number;
  phone: string;
  warehouseStocks: Stock[];
  isExpanded: boolean = false;
}
