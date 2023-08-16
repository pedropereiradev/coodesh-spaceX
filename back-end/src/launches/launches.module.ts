import { Module } from '@nestjs/common';
import { LaunchesService } from './launches.service';
import { LaunchesController } from './launches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Launch, LaunchSchema } from './models/launch.model';
import { Rocket, RocketSchema } from './models/rocket.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Launch.name, schema: LaunchSchema },
      { name: Rocket.name, schema: RocketSchema },
    ]),
  ],
  controllers: [LaunchesController],
  providers: [LaunchesService],
})
export class LaunchesModule {}
