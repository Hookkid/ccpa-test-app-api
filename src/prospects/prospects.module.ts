import { Module } from '@nestjs/common';
import { ProspectsController } from './prospects.controller';
import { ProspectsService } from './prospects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProspectRepository } from './prospect.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProspectRepository]),
    AuthModule,
  ],
  controllers: [ProspectsController],
  providers: [ProspectsService],
})
export class UsersModule {}
