import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { Chat } from "./chat.entity";
import { TypeOrmModule } from "@nestjs/typeorm"
import { OpenaiService } from "../openai/openai.service";

@Module({
    imports: [TypeOrmModule.forFeature([Chat])],
    controllers: [ChatController],
    providers: [ChatService, OpenaiService],
    exports: [ChatService],
})


export class ChatModule { }


