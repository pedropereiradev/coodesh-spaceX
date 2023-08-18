import { Controller, Get, Query } from '@nestjs/common';
import { LaunchService } from './launch.service';
import { PaginationQueryDto } from 'src/utils/pagination/pagination-query.dto';
import { IStats } from './interfaces/stats';
import { ILaunches } from './interfaces/launch';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('launch')
@Controller('launch')
export class LaunchController {
  constructor(private readonly launchService: LaunchService) {}

  @Get(`stats`)
  async getStats(): Promise<IStats> {
    return this.launchService.getStats();
  }

  @Get()
  async findAll(
    @Query() paginationData: PaginationQueryDto,
  ): Promise<ILaunches> {
    return this.launchService.findAll(paginationData);
  }
}
