import { Module } from '@nestjs/common';
import { MessagingController } from './messaging.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [MessagingController],
  imports: [ConfigModule.forRoot()],
})
export class MessagingModule {}
