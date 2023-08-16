import { Injectable } from '@nestjs/common';
import { CreateLaunchDto } from './dto/create-launch.dto';
import { UpdateLaunchDto } from './dto/update-launch.dto';
import { PaginationQueryDto } from 'src/utils/pagination/pagination-query.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Launch } from './models/launch.model';
import { Model } from 'mongoose';
import { Rocket } from './models/rocket.model';

@Injectable()
export class LaunchesService {
  constructor(
    @InjectModel(Launch.name) private launchModel: Model<Launch>,
    @InjectModel(Rocket.name) private rocketModel: Model<Rocket>,
  ) {}

  // async create(createLaunchDto: CreateLaunchDto) {
  //   return 'This action adds a new launch';
  // }

  async findAll(paginationData: PaginationQueryDto) {
    const searchQuery = paginationData.search
      ? {
          $or: [
            { result: new RegExp(paginationData.search, 'i') },
            { missionName: new RegExp(paginationData.search, 'i') },
          ],
        }
      : {};

    const totalDocs = await this.launchModel.find().estimatedDocumentCount();
    const totalPages = Math.ceil(totalDocs / paginationData.limit);
    const hasNext = paginationData.page === totalPages;
    const hasPrev = paginationData.page === 1;

    const offset = paginationData.limit * paginationData.page;

    const result = await this.launchModel
      .find({ ...searchQuery })
      .limit(paginationData.limit)
      .skip(offset)
      .populate(Rocket.name);

    return {
      result,

      totalDocs,
      page: paginationData.page,
      totalPages,
      hasNext,
      hasPrev,
    };
  }

  async getStats() {}

  // async findOne(id: number) {
  //   return `This action returns a #${id} launch`;
  // }

  // async update(id: number, updateLaunchDto: UpdateLaunchDto) {
  //   return `This action updates a #${id} launch`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} launch`;
  // }
}
