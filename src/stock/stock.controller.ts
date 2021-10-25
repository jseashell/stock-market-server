import { Controller, Get, Param } from '@nestjs/common';
import { Stock } from './stock.interface';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get(':symbol')
  findOne(@Param() params): Stock {
    return this.stockService.findOne(params.symbol);
  }
}
