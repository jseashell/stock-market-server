import { Clock } from './clock.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClockService {
  private clock: Clock = {
    days: 1,
    minutes: 0,
  };

  get days() {
    return this.clock.days;
  }

  get minutes() {
    return this.clock.minutes;
  }

  tick(): void {
    this.clock.minutes++;
    if (this.clock.minutes >= 480) {
      this.clock.minutes = 0;
      this.clock.days++;
    }
  }
}
