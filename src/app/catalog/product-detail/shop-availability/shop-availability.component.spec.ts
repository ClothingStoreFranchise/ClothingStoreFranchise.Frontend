import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAvailabilityComponent } from './shop-availability.component';

describe('ShopAvailabilityComponent', () => {
  let component: ShopAvailabilityComponent;
  let fixture: ComponentFixture<ShopAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
