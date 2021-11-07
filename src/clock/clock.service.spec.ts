import { Test, TestingModule } from '@nestjs/testing';

import { ClockGateway } from './clock.gateway';
import { ClockService } from './clock.service';

describe('ClockService', () => {
  let service: ClockService;
  let gateway: ClockGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClockService, ClockGateway],
    }).compile();

    service = module.get<ClockService>(ClockService);

    gateway = module.get<ClockGateway>(ClockGateway);
    jest.spyOn(gateway, 'emitClock').mockImplementation(jest.fn());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('time', () => {
    it("should return the clock's minutes as 24h time, offset from 8am", () => {
      jest.spyOn(service, 'minutes', 'get').mockImplementation(() => 305);
      expect(service.time).toBe('13:05');
    });
  });

  describe('tick', () => {
    it('should increment minutes by 1', () => {
      expect(service.days).toBe(1);
      expect(service.minutes).toBe(0);
      service.tick();
      expect(service.days).toBe(1);
      expect(service.minutes).toBe(1);
    });

    it('should increment days by 1', () => {
      expect(service.days).toBe(1);
      expect(service.minutes).toBe(0);
      for (let i = 0; i < 480; i++) {
        service.tick();
      }
      expect(service.days).toBe(2);
      expect(service.minutes).toBe(0);
    });

    it('should emit clock data to socket clients', () => {
      const emitClock = jest.fn();
      jest.spyOn(gateway, 'emitClock').mockImplementation(emitClock);

      service.tick();

      expect(emitClock).toHaveBeenCalled();
    });
  });
});
