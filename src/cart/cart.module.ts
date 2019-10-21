import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartRepository])
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
