import { GameClockService } from 'src/game-clock/game-clock.service';
import { Injectable } from '@nestjs/common';
import { MarketGateway } from './market.gateway';
import { MarketRepository } from './market.repository';
import { Stock } from 'src/stock/stock.interface';

@Injectable()
export class MarketService {
  constructor(
    private repo: MarketRepository,
    private gateway: MarketGateway,
    private gameClockService: GameClockService,
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
  tick(props: { isNewDay?: boolean }): void {
    this.repo.findAllStocks().forEach((stock) => {
      const rand = Math.random();
      const increment = (rand > 0.5 ? 1 + rand : -1 - rand) + rand;

      let startPrice = stock.startPrice;
      if (props.isNewDay) {
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

    this.gateway.emitMarket(this.repo.findAllStocks());
  }

  private calculateDayChangePercent(stock: Stock): number {
    return ((stock.price - stock.startPrice) / stock.startPrice) * 100;
  }
}
