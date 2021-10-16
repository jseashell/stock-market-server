import { GameClockService } from './game-clock.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [GameClockService],
  exports: [GameClockService],
})
export class GameClockModule {}
