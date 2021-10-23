import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
@WebSocketGateway(3001, { namespace: 'news-feed', cors: true })
export class NewsFeedGateway {
  @SubscribeMessage('hello')
  handleHello(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): void {
    client.broadcast.emit('hello', payload);
  }
}
