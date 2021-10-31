import { Test, TestingModule } from '@nestjs/testing';

import { ClockModule } from '../clock/clock.module';
import { Logger } from '@nestjs/common';
import { MarketGateway } from './market.gateway';
import { MarketRepository } from './market.repository';
import { MarketService } from './market.service';
import { Stock } from '../stock/stock';
import { Volatility } from '../volatility/volatility';

describe('MarketService', () => {
  let repo: MarketRepository;
  let gateway: MarketGateway;
  let service: MarketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClockModule],
      providers: [MarketService, MarketRepository, MarketGateway, Logger],
    }).compile();

    repo = module.get<MarketRepository>(MarketRepository);
    gateway = module.get<MarketGateway>(MarketGateway);
    service = module.get<MarketService>(MarketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('should return truthy when a stock exists', () => {
      const symbol = 'TEST';
      repo.init([
        {
          symbol: symbol,
          price: 0,
          lastPrice: 0,
          startPrice: 1,
          days: 1,
          minutes: 0,
          dayChangePercent: 0,
          volatility: Volatility.LOW,
        },
      ]);
      expect(service.find(symbol)).toBeTruthy();
    });

    it("should return falsy the stock doesn't exist", () => {
      jest.spyOn(repo, 'findAll').mockImplementation(() => []);
      expect(service.find('TEST')).toBeFalsy();
    });
  });

  describe('findAll', () => {
    it('should return all stocks', () => {
      const result: Stock[] = [
        {
          symbol: 'TEST',
          price: 0,
          lastPrice: 0,
          startPrice: 1,
          days: 1,
          minutes: 0,
          dayChangePercent: 0,
          volatility: Volatility.LOW,
        },
      ];

      jest.spyOn(repo, 'findAll').mockImplementationOnce(() => {
        return result;
      });

      expect(service.findAll()).toStrictEqual(result);
    });
  });

  describe('tick', () => {
    it('should update all prices', () => {
      const firstSymbol = 'UNIT';
      const secondSymbol = 'TEST';

      const price = 1.0;

      repo.init([
        {
          symbol: firstSymbol,
          price: price,
          lastPrice: 0,
          startPrice: 1,
          days: 1,
          minutes: 0,
          dayChangePercent: 0,
          volatility: Volatility.LOW,
        },
        {
          symbol: secondSymbol,
          price: price,
          lastPrice: 0,
          startPrice: 1,
          days: 1,
          minutes: 0,
          dayChangePercent: 0,
          volatility: Volatility.LOW,
        },
      ]);

      jest.spyOn(gateway, 'emitMarket').mockImplementation(() => jest.fn());
      service.tick();

      expect(service.find(firstSymbol).price).not.toBe(price);
      expect(service.find(secondSymbol).price).not.toBe(price);
    });

    it('should emit market data to socket clients', () => {
      jest.spyOn(repo, 'findAll').mockImplementation(() => []);

      const emitMarket = jest.fn();
      jest.spyOn(gateway, 'emitMarket').mockImplementationOnce(emitMarket);

      service.tick();

      expect(emitMarket).toBeCalledTimes(1);
    });
  });
});
