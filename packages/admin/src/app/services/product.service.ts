import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {
  ProductCreateDTO,
  ProductResponse,
} from '../shared/interfaces/product/product-response.interface';
import { API_URL } from '../shared/enum/api-url.enum';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ApiService {
  findAll(): Observable<ProductResponse[]> {
    return this.get<ProductResponse[]>(API_URL.PRODUCT);
  }

  create(productCreateDTO: ProductCreateDTO): Observable<ProductResponse> {
    const { name, description, category, price, stock, image } =
      productCreateDTO;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price.toString());
    formData.append('stock', stock.toString());
    formData.append('image', image);
    return this.post<ProductResponse>(API_URL.PRODUCT, formData);
  }
}
