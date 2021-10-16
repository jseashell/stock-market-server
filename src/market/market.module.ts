import { MarketRepository } from './market.repository';
import { MarketService } from './market.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MarketService, MarketRepository],
  exports: [MarketService],
})
export class MarketModule {}
