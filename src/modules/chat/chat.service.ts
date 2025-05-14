import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { MongoRepository } from 'typeorm';
import { OpenaiService } from '../openai/openai.service';
import { CreateChatDto } from '../chat/create-chat.dto';


@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepo: MongoRepository<Chat>, private readonly openaiService: OpenaiService,
    ) { }

    async saveMessage(chat: Partial<Chat>) {
        return this.chatRepo.save(chat);
    }

    async getHistory(userId: string, sessionId: string) {
        return this.chatRepo.find({
            where: { userId, sessionId, role: 'user' },
            order: { sessionId: 'ASC' },
        });
    }

    async getAllHistory() {
        return this.chatRepo.find({
            where: { role: 'user' },
            order: { createdAt: 'ASC' },
        });
    }


    async createChat(dto: any) {
        const sessionId = "123";
        console.log("Request :", dto);
        // Save user message
        this.chatRepo.save({
            userId: dto.userId,
            sessionId,
            role: 'user',
            message: dto.message,
        });

        // Retrieve chat history
        const history = await this.getHistory(dto.userId, sessionId);


        // Format for OpenAI
        const messages = history.map((msg) => ({
            role: msg.role || 'user',
            content: msg.message || 'No message',
        }));

        //Append user message to messages
        messages.push({
            role: 'user',
            content: dto.message,
        });
        console.log('history', messages);
        // Send to OpenAI

        if (messages.length != 0) {
            const aiResponse = await this.openaiService.chatWithMemory(messages);
            console.log('AI Response:', aiResponse);
            // Save assistant response
            this.chatRepo.save({
                userId: dto.userId,
                sessionId,
                role: 'assistant',
                message: aiResponse,
            });

            return {
                sessionId,
                response: aiResponse,
            };
        } else {
            return {
                sessionId,
                response: 'No messages found',
            };
        }

    }
}
