import { Volatility } from '../volatility/volatility.enum';

export interface FeedPost {
  symbol?: string;
  title?: string;
  text?: string;
  day?: string;
  minutes?: string;
  volatility?: Volatility;
  // TODO direction: Direction;
}
