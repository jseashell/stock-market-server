import { FeedGateway } from './feed.gateway';
import { FeedService } from './feed.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [FeedGateway, FeedService],
  exports: [FeedGateway],
})
export class FeedModule {}
