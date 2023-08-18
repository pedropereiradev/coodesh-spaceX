import { Module } from '@nestjs/common';
import { LaunchService } from './launch.service';
import { LaunchController } from './launch.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Launch, LaunchSchema } from '../launch/models/launch.model';
import { Rocket, RocketSchema } from '../launch/models/rocket.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Launch.name, schema: LaunchSchema },
      { name: Rocket.name, schema: RocketSchema },
    ]),
  ],
  controllers: [LaunchController],
  providers: [LaunchService],
})
export class LaunchModule {}
