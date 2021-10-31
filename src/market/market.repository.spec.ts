import { CreateStock, Stock, UpdateStock } from '../stock/stock';

import { Logger } from '@nestjs/common';
import { MarketRepository } from './market.repository';
import { Test } from '@nestjs/testing';
import { Volatility } from '../volatility/volatility';

describe('MarketRepository', () => {
  let repo: MarketRepository;
  let logger: Logger;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MarketRepository, Logger],
    }).compile();

    repo = module.get<MarketRepository>(MarketRepository);
    logger = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('init', () => {
    it('should initialize the repo', () => {
      const result: Stock[] = [
        {
          symbol: 'UNIT',
          price: 1,
          days: 1,
          minutes: 0,
          volatility: Volatility.LOW,
          lastPrice: 0,
          startPrice: 0,
          dayChangePercent: 0,
        },
        {
          symbol: 'TEST',
          price: 1,
          days: 1,
          minutes: 0,
          volatility: Volatility.LOW,
          lastPrice: 0,
          startPrice: 0,
          dayChangePercent: 0,
        },
      ];

      repo.init(result);
      expect(repo.findAll()).toStrictEqual(result);
    });

    it('should only initialize the repo once', () => {
      const warn = jest.fn();
      jest.spyOn(logger, 'warn').mockImplementation(warn);

      repo.init([
        {
          symbol: 'TEST',
          price: 1,
          days: 1,
          minutes: 0,
          volatility: Volatility.LOW,
          lastPrice: 0,
          startPrice: 0,
          dayChangePercent: 0,
        },
      ]);

      const symbolThatShouldNotExist = 'UNIT';
      repo.init([
        {
          symbol: symbolThatShouldNotExist,
          price: 1,
          days: 1,
          minutes: 0,
          volatility: Volatility.LOW,
          lastPrice: 0,
          startPrice: 0,
          dayChangePercent: 0,
        },
      ]);

      expect(repo.find(symbolThatShouldNotExist)).toBeFalsy();
      expect(warn).toBeCalledTimes(1);
    });
  });

  describe('initWithSeed', () => {
    it('should seed the database with hard-coded stocks', () => {
      repo.initWithSeed();
      expect(repo.findAll()).toBeTruthy();
    });

    it('should only initialize the repo once', () => {
      const warn = jest.fn();
      jest.spyOn(logger, 'warn').mockImplementation(warn);

      repo.initWithSeed();
      repo.initWithSeed();
      expect(warn).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should return the created entity', () => {
      repo.init([]);

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
    it('should set the last price with the current price', () => {
      const symbol = 'TEST';
      const price = 1;
      const volatility = Volatility.LOW;

      const seed: Stock = {
        symbol: symbol,
        price: price,
        days: 1,
        minutes: 0,
        volatility: volatility,
        lastPrice: 0,
        startPrice: 0,
        dayChangePercent: 0,
      };

      repo.init([seed]);

      const newPrice = 2;
      const updateStock: UpdateStock = { price: newPrice };

      const result: Stock = {
        ...seed,
        lastPrice: price,
        price: newPrice,
      };

      expect(repo.update(symbol, updateStock)).toMatchObject(result);
    });
  });
});
