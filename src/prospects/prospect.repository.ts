import _ from 'lodash';
import { Prospect } from './prospect.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Prospect)
export class ProspectRepository extends Repository<Prospect> {
  // private logger = new Logger('UserRepository');

  async createTask(
    createTaskDto: CreateProspectDto
  ): Promise<Prospect> {
    const { name, email, zipcode } = createTaskDto;

    const prospect = new Prospect();
    prospect.name = name;
    prospect.email = email;
    prospect.zipcode = zipcode;
    await prospect.save();

    return prospect;
  }
}
