import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { Stock } from '../stock/stock';

@Injectable()
@WebSocketGateway(3002, { namespace: 'market', cors: true })
export class MarketGateway {
  @WebSocketServer()
  private server: Server;

  emitMarket(stocks: Stock[]): void {
    const payload = {
      stocks: stocks,
    };

    this.server.emit('market-update', payload);
  }
}
