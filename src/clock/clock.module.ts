import { ClockGateway } from './clock.gateway';
import { ClockService } from './clock.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ClockService, ClockGateway],
  exports: [ClockService],
})
export class ClockModule {}
