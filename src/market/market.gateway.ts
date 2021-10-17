import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameClockService } from 'src/game-clock/game-clock.service';
import { Stock } from 'src/stock/stock.interface';

@WebSocketGateway(3001, { namespace: 'market', cors: true })
export class MarketGateway {
  constructor(private gameClockService: GameClockService) {}

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('hello')
  handleHello(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): void {
    client.broadcast.emit('hello', payload);
  }

  emitMarket(stocks: Stock[]): void {
    const time =
      (8 + this.gameClockService.minutes / 60).toFixed(0).padStart(2, '0') +
      ':' +
      (this.gameClockService.minutes % 60).toFixed(0).padStart(2, '0');

    const payload = {
      day: this.gameClockService.days,
      time: time,
      stocks: stocks,
    };

    this.server.emit('market-update', payload);
  }
}
