import { Test, TestingModule } from '@nestjs/testing';
import { LaunchController } from './launch.controller';
import { LaunchService } from './launch.service';

describe('LaunchController', () => {
  let controller: LaunchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaunchController],
      providers: [LaunchService],
    }).compile();

    controller = module.get<LaunchController>(LaunchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
