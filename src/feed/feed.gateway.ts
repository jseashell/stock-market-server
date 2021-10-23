import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { FeedPost } from './feed-post.interface';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway(3001, { namespace: 'feed', cors: true })
export class FeedGateway {
  @WebSocketServer()
  private server: Server;

  emitNewFeedPost(feedPost: FeedPost): void {
    this.server.emit('update-feed', feedPost);
  }
}
