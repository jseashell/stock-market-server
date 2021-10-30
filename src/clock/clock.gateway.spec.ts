import { Test, TestingModule } from '@nestjs/testing';
import { ClockGateway } from './clock.gateway';

describe('ClockGateway', () => {
  let gateway: ClockGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClockGateway],
    }).compile();

    gateway = module.get<ClockGateway>(ClockGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
