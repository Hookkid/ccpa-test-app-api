import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './prospects/prospects.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductsModule,
    AuthModule,
    CartModule,
    UsersModule,
  ],
})
export class AppModule {}
