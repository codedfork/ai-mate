import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: MongoRepository<Chat>,
  ) {}

  async saveMessage(chat: Partial<Chat>) {
    return this.chatRepo.save(chat);
  }

  async getHistory(userId: string, sessionId: string) {
    return this.chatRepo.find({
      where: { userId, sessionId },
      order: { createdAt: 'ASC' },
    });
  }
}
