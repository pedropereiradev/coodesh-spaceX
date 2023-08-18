import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LaunchesModule } from './launches/launches.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SeedsModule } from './seeds/seeds.module';
import { CronJobsModule } from './cron-jobs/cron-jobs.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ScheduleModule.forRoot(),
    LaunchesModule,
    SeedsModule,
    CronJobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
