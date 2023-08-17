import { Controller, Get, Query } from '@nestjs/common';
import { LaunchesService } from './launches.service';
import { PaginationQueryDto } from 'src/utils/pagination/pagination-query.dto';

@Controller('launch')
export class LaunchesController {
  constructor(private readonly launchService: LaunchesService) {}

  @Get()
  async findAll(@Query() paginationData: PaginationQueryDto) {
    console.log({ paginationData });

    return this.launchService.findAll(paginationData);
  }
}
