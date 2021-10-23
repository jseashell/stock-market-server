import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ClockModule } from './clock/clock.module';
import { MarketModule } from './market/market.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), ChatModule, ClockModule, MarketModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
