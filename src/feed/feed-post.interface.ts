import { Volatility } from '../volatility/volatility.enum';

export interface FeedPost {
  symbol?: string;
  title?: string;
  text?: string;
  day?: number;
  time?: string;
  volatility?: Volatility;
  // TODO direction: Direction;
}
