import { Injectable } from '@nestjs/common';
import { MarketService } from '../market/market.service';
import { Stock } from './stock.interface';

@Injectable()
export class StockService {
  constructor(private marketService: MarketService) {}

  findOne(symbol: string): Stock {
    return this.marketService.findOne(symbol);
  }
}
