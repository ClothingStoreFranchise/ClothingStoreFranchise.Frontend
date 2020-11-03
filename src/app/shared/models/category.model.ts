import { Offer } from "./offer.model";

export class Category {
  id?: number;
  name: string;
  clothingSizeType: number;
  categoryBelongingId?: number;
  subcategories: Category[];
  currentOffer:  Offer;
  offersRecord: Offer[];

  constructor( name: string, id?: number, categoryBelongingId?: number, clothingSizeType?: number){
    this.id = id;
    this.name = name;
    this.categoryBelongingId = categoryBelongingId;
    this.clothingSizeType = clothingSizeType;
  }
}
