import { ClockService } from './clock.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ClockService],
  exports: [ClockService],
})
export class ClockModule {}
