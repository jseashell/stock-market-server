import { ClockModule } from '../clock/clock.module';
import { FeedGateway } from './feed.gateway';
import { FeedRepository } from './feed.repository';
import { FeedService } from './feed.service';
import { Module } from '@nestjs/common';
import { RandomService } from '../random/random.service';

@Module({
  providers: [FeedGateway, FeedService, FeedRepository, RandomService],
  imports: [ClockModule],
  exports: [FeedService],
})
export class FeedModule {}
