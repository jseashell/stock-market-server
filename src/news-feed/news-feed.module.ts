import { Module } from '@nestjs/common';
import { NewsFeedGateway } from './news-feed.gateway';

@Module({
  providers: [NewsFeedGateway],
  exports: [NewsFeedGateway],
})
export class NewsFeedModule {}
