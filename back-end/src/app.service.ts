import { Injectable } from '@nestjs/common';
import { IMessage } from './app.interface';

@Injectable()
export class AppService {
  get(): IMessage {
    return { message: 'Fullstack Challenge 🏅 - Space X API' };
  }
}
