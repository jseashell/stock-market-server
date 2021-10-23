import { FeedPost } from './feed-post.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedService {
  headlines: string[] = [
    '${symbol} bulls anticipating double digit gains from upcoming earnings.',
    "${symbol} literally can't go tits up!",
    'Investors holding ${symbol} scared into selling as company announces plans to restructure.',
  ];
  nextNewsPost(): FeedPost {
    return null;
  }
}
