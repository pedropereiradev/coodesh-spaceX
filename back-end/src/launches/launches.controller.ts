import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LaunchesService } from './launches.service';
// import { CreateLaunchDto } from './dto/create-launch.dto';
import { UpdateLaunchDto } from './dto/update-launch.dto';
import { PaginationQueryDto } from 'src/utils/pagination/pagination-query.dto';

@Controller('launches')
export class LaunchesController {
  constructor(private readonly launchesService: LaunchesService) {}

  // @Post()
  // create(@Body() createLaunchDto: CreateLaunchDto) {
  //   return this.launchesService.create(createLaunchDto);
  // }

  @Get()
  async findAll(@Query() paginationData: PaginationQueryDto) {
    return this.launchesService.findAll(paginationData);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.launchesService.findOne(+id);
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateLaunchDto: UpdateLaunchDto,
  // ) {
  //   return this.launchesService.update(+id, updateLaunchDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.launchesService.remove(+id);
  // }
}
