import { Test, TestingModule } from '@nestjs/testing';

import { ClockService } from '../clock/clock.service';
import { FeedGateway } from './feed.gateway';
import { FeedRepository } from './feed.repository';
import { FeedService } from './feed.service';

describe('NewsFeedService', () => {
  let service: FeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedService, FeedRepository, FeedGateway, ClockService],
    }).compile();

    service = module.get<FeedService>(FeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
