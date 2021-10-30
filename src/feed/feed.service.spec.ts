import { Test, TestingModule } from '@nestjs/testing';

import { ClockModule } from '../clock/clock.module';
import { FeedGateway } from './feed.gateway';
import { FeedRepository } from './feed.repository';
import { FeedService } from './feed.service';
import { RandomService } from '../random/random.service';

describe('FeedService', () => {
  let service: FeedService;
  let gateway: FeedGateway;
  let random: RandomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedService, FeedRepository, FeedGateway, RandomService],
      imports: [ClockModule],
    }).compile();

    service = module.get<FeedService>(FeedService);
    gateway = module.get<FeedGateway>(FeedGateway);
    random = module.get<RandomService>(RandomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('currentFeedPost', () => {
    it('should be constructed with a current post', () => {
      expect(service.currentPost).toBeTruthy();
    });
  });

  describe('tick', () => {
    it('should emit "update-feed" message when called for the first time', () => {
      const emitUpdateFeed = jest.fn();
      jest.spyOn(gateway, 'emitUpdateFeed').mockImplementation(emitUpdateFeed);

      service.tick();

      expect(emitUpdateFeed).toHaveBeenCalled();
    });

    // TODO
    // it('should emit "update-feed" message due to a random interval', () => {
    //   const emitUpdateFeed = jest.fn().mockName('emitUpdateFeed');
    //   jest.spyOn(gateway, 'emitUpdateFeed').mockImplementation(emitUpdateFeed);

    //   jest.spyOn(random, 'newRandom').mockImplementation(() => 2);

    //   service.tick();
    //   service.tick();
    //   service.tick();
    //   service.tick();

    //   expect(emitUpdateFeed).toHaveBeenCalledTimes(2);
    // });
  });
});
