import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import mongoose from 'mongoose';
import { Command, CommandRunner } from 'nest-commander';
import { Launch } from 'src/launches/models/launch.model';
import { Rocket } from 'src/launches/models/rocket.model';

@Injectable()
@Command({
  name: 'seeds',
  description: 'Run seeds to populate db with rockets and launches info',
  options: { isDefault: true },
})
export class SeedsService extends CommandRunner {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  async run() {
    const launches = await this.getLaunches();
    const rockets = await this.getRockets();

    console.log({
      launches: this.handleLaunchData(launches),
      rockets: this.handleRocketData(rockets),
    });
  }

  handleLaunchData(launches) {
    return launches.reduce(
      (acc, launch) => [
        ...acc,
        {
          launchId: launch.id,
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
          name: rocket.name,
          rocketId: new mongoose.mongo.ObjectId(rocket.id),
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
