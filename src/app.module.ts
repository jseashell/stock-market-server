import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClockModule } from './clock/clock.module';
import { FeedModule } from './feed/feed.module';
import { MarketModule } from './market/market.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), FeedModule, ClockModule, MarketModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
