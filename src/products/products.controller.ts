import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductStatusValidationPipe } from './pipes/product-status-validation.pipe';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { Product } from './product.entity';
import { ProductStatus } from './product-status.enum';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('products')
export class ProductsController {
  private logger = new Logger('ProductsController');

  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query(ValidationPipe) filterDto: GetProductsFilterDto
  ): Promise<Product[]> {
    this.logger.verbose(`Retrieving all products. Filters: ${JSON.stringify(filterDto)}`);
    return this.productsService.getProducts(filterDto);
  }

  @Get('/:id')
  getProductById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.getProductById(id, user);
  }

  @Patch('/:id/status')
  updateProductStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ProductStatusValidationPipe) status: ProductStatus,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.updateProductStatus(id, status, user);
  }
}
