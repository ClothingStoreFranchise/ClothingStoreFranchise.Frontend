import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCatalogProductComponent } from './create-catalog-product.component';

describe('CreateCatalogProductComponent', () => {
  let component: CreateCatalogProductComponent;
  let fixture: ComponentFixture<CreateCatalogProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCatalogProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCatalogProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
