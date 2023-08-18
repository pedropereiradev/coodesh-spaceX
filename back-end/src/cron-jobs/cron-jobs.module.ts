import { Module } from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Launch, LaunchSchema } from 'src/launches/models/launch.model';
import { Rocket, RocketSchema } from 'src/launches/models/rocket.model';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    MongooseModule.forFeature([
      { name: Launch.name, schema: LaunchSchema },
      { name: Rocket.name, schema: RocketSchema },
    ]),
  ],
  providers: [CronJobsService],
})
export class CronJobsModule {}
