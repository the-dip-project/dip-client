import { CommandModule } from 'nestjs-command';

import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { CoreModule } from './core/core.module';
import { NetToolsModule } from './net-tools/net-tools.module';

@Module({
  imports: [
    CommandModule,
    ConfigModule,
    ConfigModule,
    CoreModule,
    NetToolsModule,
  ],
})
export class AppModule {}
