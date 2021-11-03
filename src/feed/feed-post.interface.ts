import { Volatility } from '../volatility/volatility';

export interface Post {
  symbol?: string;
  title?: string;
  text?: string;
  day?: number;
  time?: string;
  volatility?: Volatility;
  // TODO direction: Direction;
}
