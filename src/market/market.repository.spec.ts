import { CreateStock, Stock, UpdateStock } from '../stock/stock';

import { MarketRepository } from './market.repository';
import { Test } from '@nestjs/testing';
import { Volatility } from '../volatility/volatility';

describe('MarketRepository', () => {
  let repo: MarketRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MarketRepository],
    }).compile();

    repo = module.get<MarketRepository>(MarketRepository);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('create', () => {
    it('should return the created entity', () => {
      const symbol = 'TEST';
      const price = 1;

      const createStock: CreateStock = {
        symbol: symbol,
        price: price,
        days: 1,
        minutes: 0,
        volatility: Volatility.LOW,
      };

      const result: Stock = {
        ...createStock,
        startPrice: price,
        lastPrice: price,
        dayChangePercent: 0,
      };

      expect(repo.create(createStock)).toStrictEqual(result);
    });
  });

  describe('update', () => {
    it('should update the last price', () => {
      const symbol = 'TEST';
      const price = 1;
      const days = 1;
      const minutes = 0;
      const volatility = Volatility.LOW;

      const options: CreateStock = {
        symbol: symbol,
        price: price,
        days: days,
        minutes: minutes,
        volatility: volatility,
      };

      const stock = repo.create(options);

      const newPrice = 2;
      const updateStock: UpdateStock = { price: newPrice };

      const result: Stock = {
        ...stock,
        ...updateStock,
        lastPrice: price,
      };

      expect(repo.update(symbol, updateStock)).toMatchObject(result);
    });
  });
});
