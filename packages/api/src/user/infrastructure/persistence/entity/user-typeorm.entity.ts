import { USER_ROLE } from '../../../domain/enum/user.role';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SaleTypeorm } from '../../../../sale/infrastructure/persistence/entity/sale-typeorm.entity';

@Entity({ name: 'user' })
export class UserTypeorm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surnames: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
  })
  role: USER_ROLE;

  @OneToMany(() => SaleTypeorm, (sale) => sale.user)
  sales: SaleTypeorm[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
