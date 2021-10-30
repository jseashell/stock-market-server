import { Clock } from './clock.interface';
import { ClockGateway } from './clock.gateway';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClockService {
  private clock: Clock = {
    days: 1,
    minutes: 0,
  };

  constructor(private gateway: ClockGateway) {}

  get days(): number {
    return this.clock.days;
  }

  get minutes(): number {
    return this.clock.minutes;
  }

  get time(): string {
    return (
      (8 + this.minutes / 60).toFixed(0).padStart(2, '0') +
      ':' +
      (this.minutes % 60).toFixed(0).padStart(2, '0')
    );
  }

  tick(): void {
    this.clock.minutes++;
    if (this.clock.minutes >= 480) {
      this.clock.minutes = 0;
      this.clock.days++;
    }

    this.gateway.emitClock();
  }
}
