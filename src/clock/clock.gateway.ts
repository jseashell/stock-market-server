import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { ClockService } from './clock.service';
import { Server } from 'socket.io';

@WebSocketGateway(3003, { namespace: 'clock', cors: true })
export class ClockGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private clockService: ClockService) {}

  emitClock(): void {
    this.server.emit('update-clock', {
      day: this.clockService.days,
      time: this.clockService.time,
    });
  }
}
