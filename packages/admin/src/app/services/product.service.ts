import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { ProductResponse } from "../shared/interfaces/product/product-response.interface";
import { API_URL } from "../shared/enum/api-url.enum";

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ApiService {
  findAll(): Observable<ProductResponse[]> {
    return this.get<ProductResponse[]>(API_URL.PRODUCT);
  }
}