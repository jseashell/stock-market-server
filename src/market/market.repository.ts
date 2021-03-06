import { CreateStock, Stock, UpdateStock } from '../stock/stock';
import { Injectable, Logger } from '@nestjs/common';

import { Volatility } from '../volatility/volatility';

@Injectable()
export class MarketRepository {
  private isLocked = false;
  private volatility: Volatility = Volatility.MEDIUM;
  private stocks: { [symbol: string]: Stock } = {};

  private seed: Stock[] = [
    {
      symbol: 'FB',
      price: 330.05,
      days: 1,
      minutes: 0,
      lastPrice: 330.05,
      startPrice: 330.05,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'AAPL',
      price: 142.9,
      days: 1,
      minutes: 0,
      lastPrice: 142.9,
      startPrice: 142.9,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'AMZN',
      price: 3288.62,
      days: 1,
      minutes: 0,
      lastPrice: 3288.62,
      startPrice: 3288.62,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'NFLX',
      price: 632.66,
      days: 1,
      minutes: 0,
      lastPrice: 632.66,
      startPrice: 632.66,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'GOOG',
      price: 2801.12,
      days: 1,
      minutes: 0,
      lastPrice: 2801.12,
      startPrice: 2801.12,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'ACM',
      price: 36.6,
      days: 1,
      minutes: 0,
      lastPrice: 36.6,
      startPrice: 36.6,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'ATER',
      price: 7.49,
      days: 1,
      minutes: 0,
      lastPrice: 7.49,
      startPrice: 7.49,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'DIS',
      price: 169.42,
      days: 1,
      minutes: 0,
      lastPrice: 169.42,
      startPrice: 169.42,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'DKS',
      price: 125.82,
      days: 1,
      minutes: 0,
      lastPrice: 125.82,
      startPrice: 125.82,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'EBAY',
      price: 80.59,
      days: 1,
      minutes: 0,
      lastPrice: 80.59,
      startPrice: 80.59,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'ETSY',
      price: 241.27,
      days: 1,
      minutes: 0,
      lastPrice: 241.27,
      startPrice: 241.27,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'GME',
      price: 169.8,
      days: 1,
      minutes: 0,
      lastPrice: 169.8,
      startPrice: 169.8,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'PLAY',
      price: 38.27,
      days: 1,
      minutes: 0,
      lastPrice: 38.27,
      startPrice: 38.27,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'PTON',
      price: 93.83,
      days: 1,
      minutes: 0,
      lastPrice: 93.83,
      startPrice: 93.83,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'SDC',
      price: 5.39,
      days: 1,
      minutes: 0,
      lastPrice: 5.39,
      startPrice: 5.39,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'BTCUSD',
      price: 59857.59,
      days: 1,
      minutes: 0,
      lastPrice: 59857.59,
      startPrice: 59857.59,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'ETHUSD',
      price: 3967.07,
      days: 1,
      minutes: 0,
      lastPrice: 3967.07,
      startPrice: 3967.07,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'GREE',
      price: 20.36,
      days: 1,
      minutes: 0,
      lastPrice: 20.36,
      startPrice: 20.36,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'HUT',
      price: 11.15,
      days: 1,
      minutes: 0,
      lastPrice: 11.15,
      startPrice: 11.15,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'OKTA',
      price: 260.38,
      days: 1,
      minutes: 0,
      lastPrice: 260.38,
      startPrice: 260.38,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'PANW',
      price: 504.13,
      days: 1,
      minutes: 0,
      lastPrice: 504.13,
      startPrice: 504.13,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'CRWD',
      price: 283.39,
      days: 1,
      minutes: 0,
      lastPrice: 283.39,
      startPrice: 283.39,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'MIME',
      price: 68.87,
      days: 1,
      minutes: 0,
      lastPrice: 68.87,
      startPrice: 68.87,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'FTNT',
      price: 335.29,
      days: 1,
      minutes: 0,
      lastPrice: 335.29,
      startPrice: 335.29,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'NET',
      price: 181.35,
      days: 1,
      minutes: 0,
      lastPrice: 181.35,
      startPrice: 181.35,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'CHPT',
      price: 21.35,
      days: 1,
      minutes: 0,
      lastPrice: 21.35,
      startPrice: 21.35,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'GOEV',
      price: 6.99,
      days: 1,
      minutes: 0,
      lastPrice: 6.99,
      startPrice: 6.99,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'RUN',
      price: 51.69,
      days: 1,
      minutes: 0,
      lastPrice: 51.69,
      startPrice: 51.69,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'TSLA',
      price: 909.68,
      days: 1,
      minutes: 0,
      lastPrice: 909.68,
      startPrice: 909.68,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'DELL',
      price: 114.54,
      days: 1,
      minutes: 0,
      lastPrice: 114.54,
      startPrice: 114.54,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'AMD',
      price: 119.82,
      days: 1,
      minutes: 0,
      lastPrice: 119.82,
      startPrice: 119.82,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'NVDA',
      price: 227.26,
      days: 1,
      minutes: 0,
      lastPrice: 227.26,
      startPrice: 227.26,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'WDC',
      price: 57.05,
      days: 1,
      minutes: 0,
      lastPrice: 57.05,
      startPrice: 57.05,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'MU',
      price: 67.51,
      days: 1,
      minutes: 0,
      lastPrice: 67.51,
      startPrice: 67.51,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'ABUS',
      price: 4.03,
      days: 1,
      minutes: 0,
      lastPrice: 4.03,
      startPrice: 4.03,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'ATOS',
      price: 2.78,
      days: 1,
      minutes: 0,
      lastPrice: 2.78,
      startPrice: 2.78,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'BNTX',
      price: 278.34,
      days: 1,
      minutes: 0,
      lastPrice: 278.34,
      startPrice: 278.34,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'CTXR',
      price: 1.94,
      days: 1,
      minutes: 0,
      lastPrice: 1.94,
      startPrice: 1.94,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'LH',
      price: 282.15,
      days: 1,
      minutes: 0,
      lastPrice: 282.15,
      startPrice: 282.15,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'MRNA',
      price: 326.54,
      days: 1,
      minutes: 0,
      lastPrice: 326.54,
      startPrice: 326.54,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'PFE',
      price: 43.16,
      days: 1,
      minutes: 0,
      lastPrice: 43.16,
      startPrice: 43.16,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'VIAC',
      price: 37.51,
      days: 1,
      minutes: 0,
      lastPrice: 37.51,
      startPrice: 37.51,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'ABNB',
      price: 166.64,
      days: 1,
      minutes: 0,
      lastPrice: 166.64,
      startPrice: 166.64,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'CRM',
      price: 292.56,
      days: 1,
      minutes: 0,
      lastPrice: 292.56,
      startPrice: 292.56,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'DOCU',
      price: 273.73,
      days: 1,
      minutes: 0,
      lastPrice: 273.73,
      startPrice: 273.73,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'B',
      price: 324.61,
      days: 1,
      minutes: 0,
      lastPrice: 324.61,
      startPrice: 324.61,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'MSFT',
      price: 309.16,
      days: 1,
      minutes: 0,
      lastPrice: 309.16,
      startPrice: 309.16,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'NEGG',
      price: 13.37,
      days: 1,
      minutes: 0,
      lastPrice: 13.37,
      startPrice: 13.37,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'PINS',
      price: 58.06,
      days: 1,
      minutes: 0,
      lastPrice: 58.06,
      startPrice: 58.06,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'PLTR',
      price: 24.43,
      days: 1,
      minutes: 0,
      lastPrice: 24.43,
      startPrice: 24.43,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'ROKU',
      price: 321.88,
      days: 1,
      minutes: 0,
      lastPrice: 321.88,
      startPrice: 321.88,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
    {
      symbol: 'ZM',
      price: 277.58,
      days: 1,
      minutes: 0,
      lastPrice: 277.58,
      startPrice: 277.58,
      dayChangePercent: 0,
      volatility: this.volatility,
    },
  ];

  constructor(private logger: Logger) {}

  /**
   * Initialized this repo with the given stocks. Removes existing stocks.
   *
   * This method can only be called once during runtime, then the repo
   * locks any mass mutation. This method should be called as early as
   * possible in the application.
   *
   * @param stocks to seed the repo with
   */
  init(stocks: Stock[]): void {
    if (!this.isLocked) {
      stocks.forEach((stock) => {
        this.stocks[stock.symbol] = stock;
      });
      this.isLocked = true;
    } else {
      this.logger.warn('Repository is already locked.', 'init');
    }
  }

  /**
   * Call {@link init} with pre-defined data
   */
  initWithSeed(): void {
    if (!this.isLocked) {
      this.init(this.seed);
    } else {
      this.logger.warn('Repository is already locked.', 'initWithSeed');
    }
  }

  create(options: CreateStock): Stock {
    const stock: Stock = {
      startPrice: options.price,
      lastPrice: options.price,
      dayChangePercent: 0,
      ...options,
    };

    this.stocks[stock.symbol] = stock;
    return stock;
  }

  find(symbol: string): Stock | null {
    return !!this.stocks[symbol] ? this.stocks[symbol] : null;
  }

  findAll(): Stock[] {
    const all: Stock[] = [];
    Object.keys(this.stocks).forEach((key) => all.push(this.stocks[key]));
    return all;
  }

  update(symbol: string, options: UpdateStock): Stock {
    const toUpdate = this.findAll().filter((s) => symbol === s.symbol)[0];

    const lastPrice = toUpdate.price;
    const updated = {
      ...toUpdate,
      ...options,
      lastPrice: lastPrice,
    };

    this.stocks[symbol] = updated;

    return updated;
  }
}
