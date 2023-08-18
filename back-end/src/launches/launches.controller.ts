import { Controller, Get, Query } from '@nestjs/common';
import { LaunchesService } from './launches.service';
import { PaginationQueryDto } from 'src/utils/pagination/pagination-query.dto';

@Controller('launch')
export class LaunchesController {
  constructor(private readonly launchService: LaunchesService) {}

  @Get(`stats`)
  async getStats() {
    return this.launchService.getStats();
  }

  @Get()
  async findAll(@Query() paginationData: PaginationQueryDto) {
    return this.launchService.findAll(paginationData);
  }
}
