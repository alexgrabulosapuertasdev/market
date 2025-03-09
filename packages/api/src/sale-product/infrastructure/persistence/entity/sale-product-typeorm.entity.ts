import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductTypeorm } from '../../../../product/infrastructure/persistence/entity/product-typeorm.entity';
import { SaleTypeorm } from '../../../../sale/infrastructure/persistence/entity/sale-typeorm.entity';

@Entity({ name: 'sale_product' })
export class SaleProductTypeorm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  quantity: number;

  @Column({ type: 'float' })
  totalAmount: number;

  @ManyToOne(() => SaleTypeorm, (sale) => sale.saleProducts)
  sale: SaleTypeorm;

  @ManyToOne(() => ProductTypeorm, (product) => product.saleProducts)
  product: ProductTypeorm;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
