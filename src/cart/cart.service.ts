import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { User } from '../auth/user.entity';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartRepository)
        private cartRepository: CartRepository,
      ) {}
    
    async getCartItemsByUserId(
        userId: number
      ): Promise<Cart[]> {
        const found = await this.cartRepository.find({
          relations: ["product"],
          where: { userId }
        });
    
        if (!found) {
          throw new NotFoundException(`User with id "${userId}" not found`);
        }
        
        return found;
      }

      async addCartItem(
        user: User,
        itemId: number
      ): Promise<Cart> {
        return this.cartRepository.addCartItem(user, itemId);
      }
      
}
