import { ClockService } from '../clock/clock.service';
import { Injectable } from '@nestjs/common';
import { MarketGateway } from './market.gateway';
import { MarketRepository } from './market.repository';
import { Stock } from '../stock/stock.interface';

@Injectable()
export class MarketService {
  constructor(
    private repo: MarketRepository,
    private gateway: MarketGateway,
    private clockService: ClockService,
  ) {}

  /**
   * @returns all stocks in the market
   */
  findAll(): Stock[] {
    return this.repo.findAllStocks();
  }

  /**
   * Ticks each stock in the market repo
   */
  tick(): void {
    this.repo.findAllStocks().forEach((stock) => {
      const rand = Math.random();
      const increment = (rand > 0.5 ? 1 + rand : -1 - rand) + rand;

      const isNewDay: boolean = this.clockService.minutes === 0;
      let startPrice = stock.startPrice;
      if (isNewDay) {
        startPrice = stock.price;
      }

      const price = stock.price + increment;
      const dayChangePercent = this.calculateDayChangePercent(stock);

      this.repo.update(stock.symbol, {
        price: price,
        startPrice: startPrice,
        dayChangePercent: dayChangePercent,
      });
    });

    const time =
      (8 + this.clockService.minutes / 60).toFixed(0).padStart(2, '0') +
      ':' +
      (this.clockService.minutes % 60).toFixed(0).padStart(2, '0');

    this.gateway.emitMarket(
      this.repo.findAllStocks(),
      this.clockService.days.toString(),
      time,
    );
  }

  private calculateDayChangePercent(stock: Stock): number {
    return ((stock.price - stock.startPrice) / stock.startPrice) * 100;
  }
}
