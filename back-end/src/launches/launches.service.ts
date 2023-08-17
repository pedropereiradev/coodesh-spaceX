import { Injectable } from '@nestjs/common';
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

  async findAll(paginationData: PaginationQueryDto) {
    const searchQuery = paginationData.search
      ? { missionName: new RegExp(paginationData.search, 'i') }
      : {};

    const totalDocs = await this.launchModel
      .find({ ...searchQuery })
      .countDocuments();
    const totalPages = Math.ceil(totalDocs / Number(paginationData.limit));
    const hasNext = Number(paginationData.page) !== totalPages;
    const hasPrev = Number(paginationData.page) !== 1;

    const offset =
      Number(paginationData.limit) * (Number(paginationData.page) - 1);

    const result = await this.launchModel
      .find({ ...searchQuery })
      .limit(Number(paginationData.limit))
      .skip(offset)
      .populate('rocket', ['name']);

    return {
      result,

      totalDocs,
      page: Number(paginationData.page),
      totalPages,
      hasNext,
      hasPrev,
    };
  }

  async successAndFailureLaunches() {
    const success = await this.launchModel
      .find({ result: true })
      .countDocuments();

    const failure = await this.launchModel
      .find({ result: false })
      .countDocuments();

    return {
      success,
      failure,
    };
  }
}
