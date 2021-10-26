import { Volatility } from '../volatility/volatility.enum';

export interface Stock {
  symbol: string;
  price: number;
  days: number;
  minutes: number;
  lastPrice: number;
  startPrice: number;
  dayChangePercent: number;
  volatility: Volatility;
}

/**
 * Create options for a {@link Stock}
 */
export type CreateStock = Omit<Stock, 'lastPrice' | 'dayChangePercent'>;

/**
 * Update options for a {@link Stock}
 */
export type UpdateStock = Partial<Omit<Stock, 'symbol' | 'lastPrice'>>;
