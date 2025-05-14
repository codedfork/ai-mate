import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb', // or 'mysql', 'sqlite', etc.
    host: 'mongodb://localhost:27017',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
