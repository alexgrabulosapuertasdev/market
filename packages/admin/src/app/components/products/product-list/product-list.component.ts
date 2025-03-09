import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { ProductService } from "../../../services/product.service";
import { ProductResponse } from "../../../shared/interfaces/product/product-response.interface";

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  providers: [MessageService],
  imports: [ButtonModule, CardModule, TableModule],
})
export class ProductListComponent {
  products: ProductResponse[] = [];

  constructor(
    private readonly messageService: MessageService,
    private readonly productService: ProductService,
  ) {
    this.fetchProducts()
  }

  private fetchProducts(): void {
    this.productService.findAll().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Obtener productos',
          detail: 'Error al obtener los productos',
        });
      },
    });
  }
}
