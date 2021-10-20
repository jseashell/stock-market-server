import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Stock } from '../stock/stock.interface';

@Injectable()
@WebSocketGateway(3002, { namespace: 'market', cors: true })
export class MarketGateway {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('hello')
  handleHello(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): void {
    client.broadcast.emit('hello', payload);
  }

  emitMarket(stocks: Stock[], days: string, time: string): void {
    const payload = {
      day: days,
      time: time,
      stocks: stocks,
    };

    this.server.emit('market-update', payload);
  }
}
