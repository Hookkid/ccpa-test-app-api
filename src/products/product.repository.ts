import _ from 'lodash';
import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductStatus } from './product-status.enum';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { User } from '../auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private logger = new Logger('ProductRepository');

  async getProducts(
    filterDto: GetProductsFilterDto
  ): Promise<Product[]> {
    const query = this.createQueryBuilder('product');
    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      this.logger.error(`Failed to get products. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
