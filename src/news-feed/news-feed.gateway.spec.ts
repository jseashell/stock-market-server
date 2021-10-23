import { Test, TestingModule } from '@nestjs/testing';

import { NewsFeedGateway } from './news-feed.gateway';

describe('NewsFeedGateway', () => {
  let gateway: NewsFeedGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsFeedGateway],
    }).compile();

    gateway = module.get<NewsFeedGateway>(NewsFeedGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
