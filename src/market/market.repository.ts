import { Stock, UpdateStock } from 'src/stock/stock.interface';

import { Direction } from 'src/stock/direction.enum';
import { Injectable } from '@nestjs/common';
import { Volatility } from 'src/stock/volatility.enum';

@Injectable()
export class MarketRepository {
  private volatility: Volatility = Volatility.MEDIUM;
  private direction: Direction = Direction.UP;
  private stocks: Stock[] = [
    {
      symbol: 'FB',
      price: 330.05,
      lastPrice: 330.05,
      startPrice: 330.05,
      dayChangePercent: 0,
      volatility: this.volatility,
      direction: this.direction,
    },
    {
      symbol: 'AAPL',
      price: 142.9,
      lastPrice: 142.9,
      startPrice: 142.9,
      dayChangePercent: 0,
      volatility: this.volatility,
      direction: this.direction,
    },
    {
      symbol: 'AMZN',
      price: 3288.62,
      lastPrice: 3288.62,
      startPrice: 3288.62,
      dayChangePercent: 0,
      volatility: this.volatility,
      direction: this.direction,
    },
    {
      symbol: 'NFLX',
      price: 632.66,
      lastPrice: 632.66,
      startPrice: 632.66,
      dayChangePercent: 0,
      volatility: this.volatility,
      direction: this.direction,
    },
    {
      symbol: 'GOOG',
      price: 2801.12,
      lastPrice: 2801.12,
      startPrice: 2801.12,
      dayChangePercent: 0,
      volatility: this.volatility,
      direction: this.direction,
    },
  ];

  /**
   * @returns {Stock[]} all stocks in the market repo
   */
  findAllStocks(): Stock[] {
    return this.stocks;
  }

  /**
   * Updates the given stock in this market, then returns it
   *
   * @param symbol to look up
   * @param options new values
   * @returns the updated stock
   */
  update(symbol: string, options: UpdateStock): Stock {
    const updated = this.stocks.filter((s) => symbol === s.symbol)[0];
    updated.lastPrice = updated.price;
    updated.price = options.price || updated.price;
    updated.startPrice = options.startPrice || updated.startPrice;
    updated.dayChangePercent =
      options.dayChangePercent || updated.dayChangePercent;
    updated.volatility = options.volatility || updated.volatility;
    return updated;
  }
}
