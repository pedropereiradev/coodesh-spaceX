import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IMessage } from './app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get(): IMessage {
    return this.appService.get();
  }
}
