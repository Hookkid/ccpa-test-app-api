import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/product.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({type: 'decimal'})
  cost: number;
  
  @Column({type: 'decimal'})
  quantity: number;
  
  @OneToOne(type => Product)
  @JoinColumn()
  product: Product;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
  
}
