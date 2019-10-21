import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { ProspectsService } from './prospects.service';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { Prospect } from './prospect.entity';

@Controller('prospects')
export class ProspectsController {
  // private logger = new Logger('ProspectsController');

  constructor(private prospectsService: ProspectsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createProspect(
    @Body() createProspectDto: CreateProspectDto,
  ): Promise<Prospect> {
    return this.prospectsService.createProspect(createProspectDto);
  }
}
