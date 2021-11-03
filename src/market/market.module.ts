import { Logger, Module } from '@nestjs/common';

import { ClockModule } from '../clock/clock.module';
import { MarketGateway } from './market.gateway';
import { MarketRepository } from './market.repository';
import { MarketService } from './market.service';

@Module({
  imports: [ClockModule],
  providers: [Logger, MarketService, MarketRepository, MarketGateway],
  exports: [MarketService],
})
export class MarketModule {}
