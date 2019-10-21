import { ProductStatus } from '../product-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetProductsFilterDto {
  @IsOptional()
  @IsIn([ProductStatus.OPEN, ProductStatus.IN_PROGRESS, ProductStatus.DONE])
  status: ProductStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
