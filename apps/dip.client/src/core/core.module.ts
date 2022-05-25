import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';

import { CoreService } from './core.service';

@Module({
  imports: [ConfigModule],
  providers: [CoreService],
})
export class CoreModule {}
