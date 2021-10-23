import { ClockService } from '../clock/clock.service';
import { FeedGateway } from './feed.gateway';
import { FeedPost } from './feed-post.interface';
import { FeedRepository } from './feed.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedService {
  private tickCount = 0;
  private rollover = this.newRandom(7, 12);
  public currFeedPost: FeedPost = this.newFeedPost();

  constructor(
    private repo: FeedRepository,
    private gateway: FeedGateway,
    private clockService: ClockService,
  ) {}

  getCurrentFeedPost(): FeedPost {
    return this.currFeedPost;
  }

  tick(): void {
    this.tickCount++;
    if (this.tickCount >= this.rollover) {
      this.tickCount = 0;
      this.rollover = this.newRandom(7, 12);
      this.currFeedPost = this.newFeedPost();
      this.gateway.emitNewFeedPost(this.currFeedPost);
    }
  }

  private newRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private newFeedPost(): FeedPost {
    const feedPost = this.repo.get(this.newRandom(0, this.repo.count() - 1));
    feedPost.day = this.clockService.days;
    feedPost.time = this.clockService.time;
    return feedPost;
  }
}
