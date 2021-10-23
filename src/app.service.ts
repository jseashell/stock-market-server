import { ClockService } from './clock/clock.service';
import { FeedPost } from './feed/feed-post.interface';
import { FeedService } from './feed/feed.service';
import { Injectable } from '@nestjs/common';
import { MarketService } from './market/market.service';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private feedPosts: FeedPost[] = [];

  constructor(
    private marketService: MarketService,
    private clockService: ClockService,
    private feedService: FeedService,
    private scheduler: SchedulerRegistry,
  ) {
    const tickMillis = parseInt(process.env.TICK_MILLIS) || 1000;
    console.log(`Tick millis set to ${tickMillis}`);

    const tickInterval = setInterval(() => this.tick(), tickMillis);
    this.scheduler.addInterval('tick', tickInterval);

    if (process.env.DEBUG_PRINT === 'true') {
      console.log('Debug printing enabled');
      const debugPrintInterval = setInterval(
        () => this.debugPrint(),
        tickMillis,
      );
      this.scheduler.addInterval('print', debugPrintInterval);
    } else {
      console.log('Debug printing disabled');
    }
  }

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

  private debugPrint(): void {
    console.log(
      '=== Day ' +
        this.clockService.days +
        ' === ' +
        (8 + this.clockService.minutes / 60).toFixed(0).padStart(2, '0') +
        ':' +
        (this.clockService.minutes % 60).toFixed(0).padStart(2, '0') +
        ' ==========================================',
    );

    const table = this.marketService.findAll().map((stock) => {
      const dayChange =
        (stock.dayChangePercent >= 0 ? '+' : '') +
        stock.dayChangePercent.toFixed(2).padStart(6, ' ') +
        '%';
      return {
        symbol: stock.symbol,
        price: '$' + stock.price.toFixed(2).padStart(9, ' '),
        'day-change': dayChange,
        open: stock.startPrice.toFixed(2).padStart(9, ' '),
      };
    });
    console.table(table);

    console.log(
      '==============================================================',
    );

    if (this.feedPosts.length > 5) {
      this.feedPosts.shift();
    }

    this.feedPosts.forEach((feedPost) => {
      let shortTitle = feedPost.title.substring(0, 60);
      if (feedPost.title.length > 60) {
        shortTitle += '...';
      }

      console.log('* ' + shortTitle);
    });
    console.log(
      '==============================================================',
    );
    console.log('\n');
  }
}
