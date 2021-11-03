import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Injectable } from '@nestjs/common';
import { Post } from './feed-post.interface';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway(3001, { namespace: 'feed', cors: true })
export class FeedGateway {
  @WebSocketServer()
  private server: Server;

  emitUpdateFeed(post: Post): void {
    this.server.emit('update-feed', post);
  }
}
