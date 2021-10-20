import { GameClockModule } from 'src/game-clock/game-clock.module';
import { MarketGateway } from './market.gateway';
import { MarketRepository } from './market.repository';
import { MarketService } from './market.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [GameClockModule],
  providers: [MarketService, MarketRepository, MarketGateway],
  exports: [MarketService],
})
export class MarketModule {}
