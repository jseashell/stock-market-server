import { ClockService } from '../clock/clock.service';
import { Injectable } from '@nestjs/common';
import { MarketGateway } from './market.gateway';
import { MarketRepository } from './market.repository';
import { Stock } from '../stock/stock.interface';
import { Volatility } from '../volatility/volatility.enum';

@Injectable()
export class MarketService {
  constructor(
    private repo: MarketRepository,
    private gateway: MarketGateway,
    private clockService: ClockService,
  ) {}

  findAll(): Stock[] {
    return this.repo.findAllStocks();
  }

  findOne(symbol: string): Stock {
    return this.findAll().filter((stock) => stock.symbol === symbol)[0];
  }
  /**
   * Ticks each stock in the market repo
   */
  tick(): void {
    this.repo.findAllStocks().forEach((stock) => {
      const lastPrice = stock.price;
      const newHistory = stock.history;
      if (newHistory.length >= 30) {
        newHistory.shift();
      }
      newHistory.push(lastPrice);

      const newPrice = this.calculateNewPrice(stock.price, stock.volatility);

      const isNewDay: boolean = this.clockService.minutes === 0;
      let startPrice = stock.startPrice;
      if (isNewDay) {
        startPrice = stock.price;
      }
      const dayChangePercent = this.calculateDayChangePercent(stock);

      this.repo.update(stock.symbol, {
        price: newPrice,
        startPrice: startPrice,
        dayChangePercent: dayChangePercent,
        history: newHistory,
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
