import { PRODUCT_CATEGORY } from '../../../domain/enum/product-category';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'product' })
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
