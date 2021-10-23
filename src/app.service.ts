import { Interval, SchedulerRegistry } from '@nestjs/schedule';

import { ClockService } from './clock/clock.service';
import { FeedPost } from './feed/feed-post.interface';
import { FeedService } from './feed/feed.service';
import { Injectable } from '@nestjs/common';
import { MarketService } from './market/market.service';

@Injectable()
export class AppService {
  private feedPosts: FeedPost[] = [];

  constructor(
    private marketService: MarketService,
    private clockService: ClockService,
    private feedService: FeedService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Interval('tick', 1000)
  private tick(): void {
    this.clockService.tick();
    this.marketService.tick();
    this.feedService.tick();

    if (this.feedPosts.length > 0) {
      const lastFeedPost = this.feedPosts[this.feedPosts.length - 1];
      const currFeedPost = this.feedService.getCurrentFeedPost();
      if (currFeedPost != lastFeedPost) {
        this.feedPosts.push(this.feedService.getCurrentFeedPost());
      }
    } else {
      // first entry into the array
      this.feedPosts.push(this.feedService.getCurrentFeedPost());
    }
  }

  // @Timeout('stop-tick', 650)
  private stopTick(): void {
    clearInterval(this.schedulerRegistry.getInterval('tick'));
    clearInterval(this.schedulerRegistry.getInterval('print'));
  }

  @Interval('print', 1000)
  private debugPrint(): void {
    console.log(
      '=== Day ' +
        this.clockService.days +
        ' === ' +
        (8 + this.clockService.minutes / 60).toFixed(0).padStart(2, '0') +
        ':' +
        (this.clockService.minutes % 60).toFixed(0).padStart(2, '0') +
        ' ===',
    );

    const ticker = this.marketService.findAll().map((stock) => {
      return (
        stock.symbol +
        ' $' +
        stock.price.toFixed(2) +
        (stock.dayChangePercent >= 0 ? '+' : '') +
        stock.dayChangePercent.toFixed(2) +
        '%'
      );
    });
    console.log(ticker.join(' | '));
    console.log('========================');
    console.log('Feed:');
    this.feedPosts.forEach((feedPost) =>
      console.log('* ' + feedPost.title + '\n\t' + feedPost.text),
    );

    console.log('\n');
  }
}
