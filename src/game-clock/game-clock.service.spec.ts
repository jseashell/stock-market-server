import { Test, TestingModule } from '@nestjs/testing';
import { GameClockService } from './game-clock.service';

describe('GameClockService', () => {
  let service: GameClockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameClockService],
    }).compile();

    service = module.get<GameClockService>(GameClockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
