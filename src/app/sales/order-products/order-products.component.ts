import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClothingSizeType, TSHIRT_JACKETS_PANTS } from 'src/app/shared/constants/clothing-sizes.constant';
import { OrderState, ORDER_STATE_DICTIONARY } from 'src/app/shared/constants/order-state.const';
import { Employee } from 'src/app/shared/models/employee.model';
import { OrderProduct } from 'src/app/shared/models/order-product.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SalesService } from 'src/app/shared/services/sales.service';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.css']
})
export class OrderProductsComponent implements OnInit {
  orderProducts: OrderProduct[];
  displayedColumns: string[] = ['id', 'date', 'address', 'total'];
  state: OrderState;
  stateString: string;

  warehouseId: number;
  isEmployee: boolean = false;

  dictionary = ORDER_STATE_DICTIONARY;
  sizesDictionary = TSHIRT_JACKETS_PANTS;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private salesService: SalesService,
    private localStorage: LocalStorageService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.state = this.route.snapshot.params['state'];

    if(this.state != undefined){
      this.showStateString(this.state);

      this.salesService.loadOrderProductsByState(this.state)
        .subscribe( orderProducts => {
          this.orderProducts = orderProducts;
        });
    }else{
      this.isEmployee = true;
      var employee: Employee = this.localStorage.get('employeeData');
      this.warehouseId = employee.warehouseId;

      this.salesService.loadOrderProductsByWarehouseId(this.warehouseId)
        .subscribe( orderProducts => {
          this.orderProducts = orderProducts;
        });
    }
  }

  prepareOrder(orderProduct: OrderProduct) {
    orderProduct.state = OrderState.PREPARED;
    this.salesService.updateOrderProduct(orderProduct).subscribe();
  }

  checkSizeType(typeId: number): boolean {
    return typeId === ClothingSizeType.tshirtsJacketsPants;
  }

  getSubtotal(orderProduct: OrderProduct): number {
    return orderProduct.unitPrice * orderProduct.quantity;
  }

  showPrepareOrder(state: OrderState): boolean{
    return this.isEmployee && state === OrderState.CONFIRMED;
  }

  showStateString(state: OrderState) {
    switch(+state){
      case OrderState.PENDING:
        this.stateString = "Pendientes";
        break;
      case 1:
        this.stateString = "Confirmados";
        break;
      case OrderState.PREPARED:
        this.stateString = "Preparados";
        break;
      case OrderState.ON_THE_WAY:
        this.stateString = "En Camino";
        break;
      case OrderState.DELIVERED:
        this.stateString = "Entregados";
        break;
      case OrderState.CANCELLED:
        this.stateString = "Cancelados";
        break;
      default:
        console.log("The sate "+state+" does not exists");
        break;
    }
  }
}
