import { Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './cart.entity';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}

    @Get('/:userId')
    getCartItems(
      @Param('userId', ParseIntPipe) userId: number
    ): Promise<Cart[]> {
      return this.cartService.getCartItemsByUserId(userId);
    }

    @Post('/addItem/:itemId')
    addCartItem(
      @Param('itemId', ParseIntPipe) itemId: number,
      @GetUser() user: User): Promise<Cart> {
      console.log('user', user);
      return this.cartService.addCartItem(user, itemId);
    }

}
