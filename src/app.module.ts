import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClockModule } from './clock/clock.module';
import { MarketModule } from './market/market.module';
import { Module } from '@nestjs/common';
import { NewsFeedModule } from './news-feed/news-feed.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    NewsFeedModule,
    ClockModule,
    MarketModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
