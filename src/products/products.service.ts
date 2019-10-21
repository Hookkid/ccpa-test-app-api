import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductStatus } from './product-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async getProducts(
    filterDto: GetProductsFilterDto
  ): Promise<Product[]> {
    return this.productRepository.getProducts(filterDto);
  }

  async getProductById(
    id: number,
    user: User,
  ): Promise<Product> {
    const found = await this.productRepository.findOne({ where: { id, userId: user.id } });

    if (!found) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return found;
  }
  async updateProductStatus(
    id: number,
    status: ProductStatus,
    user: User,
  ): Promise<Product> {
    const product = await this.getProductById(id, user);
    product.status = status;
    await product.save();
    return product;
  }
}
