import { Test, TestingModule } from '@nestjs/testing';

import { GameClockModule } from '../game-clock/game-clock.module';
import { MarketGateway } from './market.gateway';
import { MarketRepository } from './market.repository';
import { MarketService } from './market.service';

describe('MarketService', () => {
  let service: MarketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GameClockModule],
      providers: [MarketService, MarketRepository, MarketGateway],
    }).compile();

    service = module.get<MarketService>(MarketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
