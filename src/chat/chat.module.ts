import { ChatGateway } from './chat.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
