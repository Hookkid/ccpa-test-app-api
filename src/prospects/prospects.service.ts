import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { ProspectRepository } from './prospect.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Prospect } from './prospect.entity';

@Injectable()
export class ProspectsService {
  constructor(
    @InjectRepository(ProspectRepository)
    private prospectRepository: ProspectRepository,
  ) {}

  async createProspect(
    createProspectDto: CreateProspectDto
  ): Promise<Prospect> {
    return this.prospectRepository.createTask(createProspectDto);
  }

}
