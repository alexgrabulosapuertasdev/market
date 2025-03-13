import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { FieldSetItem, FormComponent } from "../../common/form/form.component";
import { ProductService } from "../../../services/product.service";
import { ProductCreateDTO, ProductResponse } from "../../../shared/interfaces/product/product-response.interface";
import { PRODUCT_CATEGORY } from "src/app/shared/enum/product-category.enum";
import { ToastModule } from "primeng/toast";

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  providers: [MessageService],
  imports: [ButtonModule, CardModule, FormComponent, TableModule, ToastModule],
})
export class ProductListComponent {
  products: ProductResponse[] = [];
  productsCategories: FieldSetItem['selectOptions'] = [];
  modalProductFormIsOpened = false;
  formGroup = new FormGroup({
    name: new FormControl<string | undefined>(undefined, [Validators.required]),
    description: new FormControl<string | undefined>(undefined, [Validators.required]),
    category: new FormControl<string | undefined>('', [Validators.required]),
    price: new FormControl<number | undefined>(undefined, [Validators.required]),
    stock: new FormControl<number | undefined>(undefined),
    image: new FormControl<File | undefined>(undefined, [Validators.required]),
  });
  fieldsetList: FieldSetItem[] = [
    { name: 'name', label: 'Nombre', placeholder: 'Indica el nombre del producto', type: 'text', required: true },
    { name: 'category', label: 'Categoria', placeholder: 'Selecciona la categoria', type: 'select', selectOptions: this.productsCategories, required: true },
    { name: 'description', label: 'Descripción', placeholder: 'Indica la descripción del producto', type: 'textarea', size: 'big', required: true },
    { name: 'price', label: 'Precio', placeholder: 'Indica el precio del producto', type: 'number', required: true },
    { name: 'stock', label: 'Cantidad', placeholder: 'Indica la cantidad disponible', type: 'number', required: false },
    { name: 'image', label: 'Imagen', placeholder: 'Añade la imagen del product', type: 'file', size: 'big', required: true },
  ];

  constructor(
    private readonly messageService: MessageService,
    private readonly productService: ProductService,
  ) {
    this.fetchProducts();
    const categories = Object.values(PRODUCT_CATEGORY);
    for (let i = 0; i < categories.length; i++) {
      this.productsCategories?.push({ value: categories[i], description: categories[i] });
    }
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

  createProduct(): void {
    if (!this.formGroup.valid) {
      return;
    }

    const { name, description, category, price, stock, image } = this.formGroup.value;

    const product: ProductCreateDTO = {
      name: name!,
      description: description!,
      category: category!,
      price: price!,
      stock: stock ?? 0,
      image: image!
    };

    this.productService.create(product).subscribe({
      next: (product) => {
        this.products.push(product);
        this.closeModalAddProduct();
        this.messageService.add({
          severity: 'success',
          summary: 'Crear producto',
          detail: 'El producto se ha creado con éxito',
        });
      },
      error: (error) => {
        this.closeModalAddProduct();
        this.messageService.add({
          severity: 'error',
          summary: 'Crear producto',
          detail: 'Error al crear el productor',
        });
        console.error(`Error: ${error}`);
      },
    });
  }

  openModalAddProduct(): void {
    this.modalProductFormIsOpened = true;
  }

  closeModalAddProduct(): void {
    this.modalProductFormIsOpened = false;
  }
}
