import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/utils/pagination/pagination-query.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Launch } from '../launch/models/launch.model';
import { Model } from 'mongoose';
import { Rocket } from '../launch/models/rocket.model';
import { ILaunch, ILaunches } from '../launch/interfaces/launch';
import { IStats } from '../launch/interfaces/stats';

@Injectable()
export class LaunchService {
  constructor(
    @InjectModel(Launch.name) private launchModel: Model<Launch>,
    @InjectModel(Rocket.name) private rocketModel: Model<Rocket>,
  ) {}

  async findAll(paginationData: PaginationQueryDto): Promise<ILaunches> {
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

    const result: ILaunch[] = await this.launchModel
      .find({ ...searchQuery })
      .sort({ flightNumber: 1 })
      .limit(Number(paginationData.limit))
      .skip(offset)
      .populate('rocket');

    return {
      result,

      totalDocs,
      page: Number(paginationData.page),
      totalPages,
      hasNext,
      hasPrev,
    };
  }

  async getStats(): Promise<IStats> {
    const launchesByYear = await this.launchesByRocketByYear();
    const results = await this.successAndFailureLaunches();
    const launchesByRocket = await this.launchesByRocket();

    return {
      launchesByYear,
      launchesByRocket,
      ...results,
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

  private async launchesByRocket() {
    const launches = await this.launchModel.aggregate([
      {
        $lookup: {
          from: 'rockets',
          as: 'rocket',
          foreignField: '_id',
          localField: 'rocket',
        },
      },
      {
        $group: {
          _id: {
            rocket: '$rocket.name',
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          rocket: { $arrayElemAt: ['$_id.rocket', 0] },
          count: 1,
        },
      },
      {
        $sort: {
          rocketName: 1,
        },
      },
    ]);

    return launches;
  }

  private async launchesByRocketByYear() {
    const launches = await this.launchModel.aggregate([
      { $addFields: { launchDate: { $toDate: '$dateUtc' } } },
      {
        $lookup: {
          from: 'rockets',
          as: 'rocket',
          foreignField: '_id',
          localField: 'rocket',
        },
      },
      {
        $unwind: '$rocket',
      },
      {
        $project: {
          dateUtc: 1,
          launchDate: 1,
          rocketName: '$rocket.name',
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$launchDate' },
            rocketName: '$rocketName',
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.year',
          rockets: {
            $push: {
              rocket: '$_id.rocketName',
              count: '$count',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: '$_id',
          rockets: '$rockets',
        },
      },
      {
        $sort: {
          year: 1,
        },
      },
    ]);

    return launches;
  }
}
