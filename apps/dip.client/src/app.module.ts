import { Module } from '@nestjs/common';
import { ConsoleModule } from '@squareboat/nest-console';
import { AppService } from './app.service';

@Module({
  imports: [ConsoleModule],
  providers: [AppService],
})
export class AppModule {}
