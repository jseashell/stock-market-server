import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClockGateway } from './clock/clock.gateway';
import { ClockModule } from './clock/clock.module';
import { ConfigModule } from '@nestjs/config';
import { FeedModule } from './feed/feed.module';
import { MarketModule } from './market/market.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RandomService } from './random/random.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    FeedModule,
    ClockModule,
    MarketModule,
  ],
  providers: [AppService, RandomService],
  controllers: [AppController],
})
export class AppModule {}
