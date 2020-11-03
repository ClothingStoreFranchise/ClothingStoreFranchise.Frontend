import { Offer } from './offer.model';
import { Shop } from './shop.model';
import { Stock } from './stock.model';
import { Warehouse } from './warehouse.model';

export class Product {
  id?: number;
  name: string;
  unitPrice: number;
  pictureUrl: string;
  clothingSizeType: number;
  currentOffer: Offer;
  offersRegistry: Offer[];
  subcategoryId: number;
  shops: Shop[];
  warehouses: Warehouse[];
  totalWarehouseStock: Stock[];

  constructor(name: string, unitPrice: number, pictureUrl: string, subcategoryId: number){
    this.name = name;
    this.unitPrice = unitPrice;
    this.pictureUrl = pictureUrl;
    this.subcategoryId = subcategoryId;
  }
}
