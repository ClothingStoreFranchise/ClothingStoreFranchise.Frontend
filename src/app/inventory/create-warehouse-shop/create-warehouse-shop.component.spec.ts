import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWarehouseShopComponent } from './create-warehouse-shop.component';

describe('CreateWarehouseShopComponent', () => {
  let component: CreateWarehouseShopComponent;
  let fixture: ComponentFixture<CreateWarehouseShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWarehouseShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWarehouseShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
