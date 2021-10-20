import { Interval, SchedulerRegistry } from '@nestjs/schedule';

import { GameClockService } from './game-clock/game-clock.service';
import { Injectable } from '@nestjs/common';
import { MarketService } from './market/market.service';

@Injectable()
export class AppService {
  constructor(
    private marketService: MarketService,
    private gameClockService: GameClockService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  // @Timeout('stop-tick', 650)
  private stopTick(): void {
    clearInterval(this.schedulerRegistry.getInterval('tick'));
    clearInterval(this.schedulerRegistry.getInterval('print'));
  }

  @Interval('tick', 1000)
  private tick(): void {
    this.gameClockService.tick();
    this.marketService.tick();
  }

  @Interval('print', 1000)
  private debugPrint(): void {
    console.log(
      '=== Day ' +
        this.gameClockService.days +
        ' === ' +
        (8 + this.gameClockService.minutes / 60).toFixed(0).padStart(2, '0') +
        ':' +
        (this.gameClockService.minutes % 60).toFixed(0).padStart(2, '0') +
        ' ===',
    );
    const table = this.marketService.findAll().map((stock) => {
      return {
        symbol: stock.symbol.padEnd(4, ' '),
        price: '$' + stock.price.toFixed(2).padStart(9, ' '),
        'day-change-%':
          stock.dayChangePercent.toFixed(2).padStart(6, ' ') + '%',
        open: '$' + stock.startPrice.toFixed(2).padStart(9, ' '),
      };
    });
    console.table(table);
    console.log('\n');
  }
}
