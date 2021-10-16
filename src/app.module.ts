import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameClockModule } from './game-clock/game-clock.module';
import { MarketModule } from './market/market.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [GameClockModule, MarketModule, ScheduleModule.forRoot()],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
