import { Module } from '@nestjs/common';

import { NetToolsService } from './net-tools.service';

@Module({
  providers: [NetToolsService],
})
export class NetToolsModule {}
