import { ClockService } from '../clock/clock.service';
import { FeedGateway } from './feed.gateway';
import { FeedRepository } from './feed.repository';
import { Injectable } from '@nestjs/common';
import { Post } from './feed-post.interface';
import { RandomService } from '../random/random.service';

@Injectable()
export class FeedService {
  private tickCount: number;
  private rollover: number;
  private currPost: Post;

  constructor(
    private repo: FeedRepository,
    private gateway: FeedGateway,
    private clock: ClockService,
    private random: RandomService,
  ) {
    this.tickCount = 0;
    this.rollover = this.random.newRandom(7, 12);
    this.currPost = this.newFeedPost();
  }

  get currentPost(): Post {
    return this.currPost;
  }

  tick(): void {
    if (this.tickCount === 0) {
      this.gateway.emitUpdateFeed(this.currPost);
    }

    this.tickCount++;
    if (this.tickCount >= this.rollover) {
      this.tickCount = 0;
      this.rollover = this.random.newRandom(7, 12);
      this.currPost = this.newFeedPost();
    }
  }

  private newFeedPost(): Post {
    const feedPost = this.repo.get(
      this.random.newRandom(0, this.repo.count() - 1),
    );
    feedPost.day = this.clock.days;
    feedPost.time = this.clock.time;
    return feedPost;
  }
}
