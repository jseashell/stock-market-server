import { Injectable } from '@nestjs/common';
import { MarketRepository } from './market.repository';
import { Stock } from 'src/stock/stock.interface';

@Injectable()
export class MarketService {
  constructor(private repo: MarketRepository) {}

  /**
   * Ticks each stock in the market repo
   */
  tick(props: { isNewDay?: boolean }): void {
    this.repo.findAllStocks().forEach((stock) => {
      const rand = Math.random();
      const increment = (rand > 0.5 ? 1 : -1) + rand;

      let startPrice = stock.startPrice;
      if (props.isNewDay) {
        startPrice = stock.price;
      }

      const price = stock.price + increment;

      this.repo.update(stock.symbol, { price: price, startPrice: startPrice });
    });
  }

  findAll(): Stock[] {
    return this.repo.findAllStocks();
  }
}
