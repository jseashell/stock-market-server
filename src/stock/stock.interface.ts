import { Direction } from './direction.enum';
import { Volatility } from 'src/stock/volatility.enum';

export interface Stock {
  symbol: string;
  price: number;
  lastPrice: number;
  startPrice: number;
  dayChangePercent: number;
  volatility: Volatility;
  direction: Direction;
}

/**
 * Create options for a {@link Stock}
 */
export type CreateStock = Omit<Stock, 'lastPrice' | 'dayChangePercent'>;

/**
 * Update options for a {@link Stock}
 */
export type UpdateStock = Partial<Omit<Stock, 'symbol' | 'lastPrice'>>;
