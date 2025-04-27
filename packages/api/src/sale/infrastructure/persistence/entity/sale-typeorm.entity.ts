import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SaleProductTypeorm } from '../../../../sale-product/infrastructure/persistence/entity/sale-product-typeorm.entity';

@Entity({ name: 'sale' })
export class SaleTypeorm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column({ type: 'float' })
  totalAmount: number;

  @Column()
  userId: string;

  @OneToMany(() => SaleProductTypeorm, (saleProduct) => saleProduct.sale)
  saleProducts: SaleProductTypeorm[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
