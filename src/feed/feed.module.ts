import { FeedGateway } from './feed.gateway';
import { FeedRepository } from './feed.repository';
import { FeedService } from './feed.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [FeedGateway, FeedService, FeedRepository],
  exports: [FeedService],
})
export class FeedModule {}
