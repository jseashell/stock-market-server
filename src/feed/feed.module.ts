import { ClockModule } from '../clock/clock.module';
import { FeedGateway } from './feed.gateway';
import { FeedRepository } from './feed.repository';
import { FeedService } from './feed.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [FeedGateway, FeedService, FeedRepository],
  imports: [ClockModule],
  exports: [FeedService],
})
export class FeedModule {}
