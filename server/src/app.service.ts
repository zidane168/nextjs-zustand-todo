import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Todos App! - by Learn Tech Tips (Zidane)';
  }
}
