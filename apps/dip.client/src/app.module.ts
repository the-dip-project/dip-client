import { CommandModule } from 'nestjs-command';

import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';

@Module({
  imports: [CommandModule, ConfigModule, ConfigModule],
})
export class AppModule {}
