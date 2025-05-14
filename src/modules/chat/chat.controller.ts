import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post('create')
    async createChat(@Body() chat: Partial<Chat>) {
        return this.chatService.createChat(chat);
    }

    @Post('message')
    async saveMessage(@Body() chat: Partial<Chat>) {
        return this.chatService.saveMessage(chat);
    }

    @Get('history')
    async getHistory(
        @Query('userId') userId: string,
        @Query('sessionId') sessionId: string,
    ) {
        return this.chatService.getHistory(userId, sessionId);
    }
    @Get('all-history')
    async getAllHistory() {
        return this.chatService.getAllHistory();
    }
}