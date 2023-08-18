import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosResponse } from 'axios';
import mongoose, { Model } from 'mongoose';
import { Command, CommandRunner } from 'nest-commander';
import { Launch } from 'src/launches/models/launch.model';
import { Rocket } from 'src/launches/models/rocket.model';

@Command({
  name: 'seeds',
  description: 'Run seeds to populate db with rockets and launches info',
  options: { isDefault: true },
})
@Injectable()
export class SeedsService extends CommandRunner {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Launch.name) private launchModel: Model<Launch>,
    @InjectModel(Rocket.name) private rocketModel: Model<Rocket>,
  ) {
    super();
  }

  async run() {
    const launches = await this.getLaunches();
    const rockets = await this.getRockets();

    const mappedSeedsToCreate = [
      { repository: this.launchModel, data: this.handleLaunchData(launches) },
      { repository: this.rocketModel, data: this.handleRocketData(rockets) },
    ];

    await Promise.all(
      mappedSeedsToCreate.map(async ({ data, repository }) => {
        const totalDocs = await repository.estimatedDocumentCount();

        if (totalDocs === 0) {
          await (repository as Model<any>)
            .insertMany(data)
            .catch((err) => console.error(err));
        }
      }),
    );

    return;
  }

  handleLaunchData(launches) {
    return launches.reduce(
      (acc, launch) => [
        ...acc,
        {
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
        },
      ],
      [],
    );
  }

  handleRocketData(rockets) {
    return rockets.reduce(
      (acc, rocket) => [
        ...acc,
        {
          _id: new mongoose.mongo.ObjectId(rocket.id),
          name: rocket.name,
        },
      ],
      [],
    );
  }

  async getLaunches(): Promise<AxiosResponse<Launch[]>> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        'https://api.spacexdata.com/v5/launches',
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getRockets(): Promise<Rocket[]> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        'https://api.spacexdata.com/v4/rockets',
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
