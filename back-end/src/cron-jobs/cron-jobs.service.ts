import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import mongoose, { Model } from 'mongoose';
import { Launch } from 'src/launch/models/launch.model';
import { Rocket } from 'src/launch/models/rocket.model';

@Injectable()
export class CronJobsService {
  constructor(
    @InjectModel(Launch.name) private launchModel: Model<Launch>,
    @InjectModel(Rocket.name) private rocketModel: Model<Rocket>,
    private readonly httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async run() {
    console.info('Buscando novos lancamentos');

    const latestLaunch = await this.getLatestLaunch();
    const isLaunchExists = await this.isLaunchExists(latestLaunch.id);

    if (!isLaunchExists) {
      this.launchModel.create(this.handleLaunchData(latestLaunch));

      console.info('Novo lancamento inserido');
      console.info(this.handleLaunchData(latestLaunch));
    } else {
      console.info('Nao ha novos lancamentos');
    }

    console.info('CRON finalizado');
  }

  async getLatestLaunch() {
    try {
      const { data } = await this.httpService.axiosRef.get(
        'https://api.spacexdata.com/v4/launches/latest',
      );

      return data;
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  async isLaunchExists(id: string) {
    return this.launchModel.findById(id);
  }

  handleLaunchData(launch) {
    return {
      _id: new mongoose.mongo.ObjectId(launch.id),
      flightNumber: launch.flight_number,
      logo: launch.links.patch.small,
      missionName: launch.name,
      dateUtc: launch.date_utc,
      rocket: new mongoose.mongo.ObjectId(launch.rocket),
      result: launch.success,
      webcast: launch.links.webcast,
      isReused: launch.cores[0].reused,
      createdAt: new Date(),
    };
  }
}
