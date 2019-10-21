import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductStatus } from './product-status.enum';
import { Cart } from '../cart/cart.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: ProductStatus;
  
  @Column()
  unit: string;
  
  @Column({type: 'decimal'})
  cost: number;
  
  @ManyToOne(type => Cart, cartItem => cartItem.id, { eager: true })
  cart: Cart;

  @Column()
  image: string;
}
