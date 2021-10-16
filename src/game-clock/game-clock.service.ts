import { GameClock } from './game-clock.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameClockService {
  private gameClock: GameClock = {
    days: 1,
    minutes: 0,
  };

  get days() {
    return this.gameClock.days;
  }

  get minutes() {
    return this.gameClock.minutes;
  }

  tick(): void {
    this.gameClock.minutes++;
    if (this.gameClock.minutes >= 480) {
      this.gameClock.minutes = 0;
      this.gameClock.days++;
    }
  }
}
