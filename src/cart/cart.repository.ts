import _ from 'lodash';
import { Cart } from './cart.entity';
import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { Product } from 'src/products/product.entity';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  private logger = new Logger('CartRepository');

  async getCartItems(
    userId: number
  ): Promise<Cart[]> {
    const query = this.createQueryBuilder('cart');
    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      this.logger.error(`Failed to get cart items. User Id: ${userId}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async addCartItem(user: User, itemId: number): Promise<Cart> {
    const query = this.createQueryBuilder('product');
    const product = await query.where(`id=${itemId}`);
    const cart = new Cart();
    console.log('product', product);
    // cart.cost = product.cost;
    // cart.quantity = 1;
    // cart.product = product;
    cart.user = user;
    await cart.save();

    delete cart.user;
    return cart;
  }

}
