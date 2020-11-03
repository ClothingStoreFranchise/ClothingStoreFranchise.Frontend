import { Stock } from './stock.model';

export class Shop {
  address: string;
  id: number;
  phone: string;
  shopStocks: Stock[];
  isExpanded: boolean = false;
}
