import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousesShopsAllocationComponent } from './warehouses-shops-allocation.component';

describe('WarehousesShopsAllocationComponent', () => {
  let component: WarehousesShopsAllocationComponent;
  let fixture: ComponentFixture<WarehousesShopsAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehousesShopsAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousesShopsAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
