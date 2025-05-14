import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './modules/chat/chat.controller';
import { ChatModule } from './modules/chat/chat.module';
import { OpenaiModule } from './modules/openai/openai.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    url: 'mongodb://localhost:27017',
    database: 'test',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  }), ChatModule, OpenaiModule],
  controllers: [AppController, ChatController],
  providers: [AppService],
})
export class AppModule { }
