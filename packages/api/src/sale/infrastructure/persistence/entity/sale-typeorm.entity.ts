import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SaleProductTypeorm } from '../../../../sale-product/infrastructure/persistence/entity/sale-product-typeorm.entity';
import { UserTypeorm } from '../../../../user/infrastructure/persistence/entity/user-typeorm.entity';

@Entity({ name: 'sale' })
export class SaleTypeorm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column({ type: 'float' })
  totalAmount: number;

  @ManyToOne(() => UserTypeorm, (user) => user.sales)
  user: UserTypeorm;

  @OneToMany(() => SaleProductTypeorm, (saleProduct) => saleProduct.sale)
  saleProducts: SaleProductTypeorm[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
