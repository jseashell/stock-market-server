import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { GameClockModule } from './game-clock/game-clock.module';
import { MarketModule } from './market/market.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ChatModule,
    GameClockModule,
    MarketModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
