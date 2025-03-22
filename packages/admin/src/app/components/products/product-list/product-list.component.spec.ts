import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../../services/product.service';
import { PRODUCT_CATEGORY } from '../../../shared/enum/product-category.enum';
import { ProductResponse } from '../../../shared/interfaces/product/product-response.interface';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  const mockProducts: ProductResponse[] = [
    {
      id: crypto.randomUUID(),
      name: crypto.randomUUID(),
      description: crypto.randomUUID(),
      category: PRODUCT_CATEGORY.ALIMENTATION_AND_DRINKS,
      price: 10,
      stock: 50,
      image: {
        originalname: crypto.randomUUID(),
        mimetype: crypto.randomUUID(),
        size: 20,
        base64: crypto.randomUUID(),
      },
    },
    {
      id: crypto.randomUUID(),
      name: crypto.randomUUID(),
      description: crypto.randomUUID(),
      category: PRODUCT_CATEGORY.ALIMENTATION_AND_DRINKS,
      price: 10,
      stock: 50,
      image: {
        originalname: crypto.randomUUID(),
        mimetype: crypto.randomUUID(),
        size: 20,
        base64: crypto.randomUUID(),
      },
    },
  ];
  beforeEach(waitForAsync(() => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['findAll']);

    productServiceSpy.findAll.and.returnValue(of(mockProducts));

    TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        MessageService,
      ],
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  }));

  describe('ngOnInit', () => {
    it('should fetch products on init', () => {
      expect(component.products).toEqual(mockProducts);
      expect(productServiceSpy.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
