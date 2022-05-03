import { Injectable } from '@nestjs/common';
import { Command } from '@squareboat/nest-console';

@Injectable()
export class AppService {
  @Command('hello')
  public hello(): void {
    console.log('hello');
  }
}
