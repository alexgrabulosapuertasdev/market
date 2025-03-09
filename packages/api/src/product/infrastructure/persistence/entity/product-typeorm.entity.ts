import { PRODUCT_CATEGORY } from '../../../domain/enum/product-category';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SaleProductTypeorm } from '../../../../sale-product/infrastructure/persistence/entity/sale-product-typeorm.entity';

@Entity({ name: 'product' })
@Index('INDEX_PRODUCT_NAME_CATEGORY', ['name', 'category'])
export class ProductTypeorm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ charset: 'utf8mb4' })
  description: string;

  @Column({
    type: 'enum',
    enum: PRODUCT_CATEGORY,
  })
  category: PRODUCT_CATEGORY;

  @Column({ type: 'float' })
  price: number;

  @Column()
  stock: number;

  @OneToMany(() => SaleProductTypeorm, (saleProduct) => saleProduct.product)
  saleProducts: SaleProductTypeorm[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
