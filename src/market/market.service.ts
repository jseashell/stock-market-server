import { ClockService } from '../clock/clock.service';
import { Injectable } from '@nestjs/common';
import { MarketGateway } from './market.gateway';
import { MarketRepository } from './market.repository';
import { Stock } from '../stock/stock';
import { Volatility } from '../volatility/volatility';

@Injectable()
export class MarketService {
  constructor(
    private repo: MarketRepository,
    private gateway: MarketGateway,
    private clockService: ClockService,
  ) {}

  findAll(): Stock[] {
    return this.repo.findAll();
  }

  /**
   * Ticks each stock in the market repo
   */
  tick(): void {
    this.repo.findAll().forEach((stock) => {
      const newPrice = this.calculateNewPrice(stock.price, stock.volatility);

      const isNewDay: boolean = this.clockService.minutes === 0;
      let startPrice = stock.startPrice;
      if (isNewDay) {
        startPrice = stock.price;
      }
      const dayChangePercent = this.calculateDayChangePercent(stock);

      this.repo.update(stock.symbol, {
        price: newPrice,
        days: this.clockService.days,
        minutes: this.clockService.minutes,
        startPrice: startPrice,
        dayChangePercent: dayChangePercent,
      });
    });

    this.gateway.emitMarket(
      this.repo.findAll(),
      this.clockService.days,
      this.clockService.minutes,
    );
  }

  /**
   * Calculates a random new price.
   * Taken from https://stackoverflow.com/a/8597889/6194785
   */
  private calculateNewPrice(
    currentPrice: number,
    volatility: Volatility,
  ): number {
    const rand = Math.random();
    let changePercent = 2 * volatility * rand;
    if (changePercent > volatility) {
      changePercent -= 2 * volatility;
    }
    const changeAmount = currentPrice * changePercent;
    const newPrice = currentPrice + changeAmount;
    return newPrice;
  }

  private calculateDayChangePercent(stock: Stock): number {
    return ((stock.price - stock.startPrice) / stock.startPrice) * 100;
  }
}
