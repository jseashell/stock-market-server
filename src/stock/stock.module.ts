import { MarketModule } from '../market/market.module';
import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  controllers: [StockController],
  imports: [MarketModule],
  providers: [StockService],
})
export class StockModule {}
