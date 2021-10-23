import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
@WebSocketGateway(3001, { namespace: 'feed', cors: true })
export class FeedGateway {
  @SubscribeMessage('hello')
  handleHello(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): void {
    client.broadcast.emit('hello', payload);
  }
}
