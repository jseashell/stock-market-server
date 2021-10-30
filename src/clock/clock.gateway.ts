import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { ClockService } from './clock.service';
import { Server } from 'socket.io';

@WebSocketGateway(3003, { namespace: 'clock', cors: true })
export class ClockGateway {
  @WebSocketServer()
  private server: Server;

  emitClock(day: number, time: string): void {
    this.server.emit('update-clock', {
      day: day,
      time: time,
    });
  }
}
