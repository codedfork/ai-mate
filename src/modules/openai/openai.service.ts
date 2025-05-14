import { Injectable } from '@nestjs/common';
import { AzureOpenAI } from "openai";
import * as dotenv from "dotenv";

@Injectable()
export class OpenaiService {

    // Process the chat and return the response
    private readonly endpoint: string;
    private readonly modelName: string;
    private readonly deployment: string;
    private readonly apiKey: string;
    private readonly apiVersion: string;
    private readonly options: any;

    constructor() {
        dotenv.config();
        this.endpoint = process.env.AZURE_OPENAI_ENDPOINT || 'https://ksour-ma0zuwap-eastus2.cognitiveservices.azure.com/';
        this.modelName = process.env.AZURE_OPENAI_MODEL_NAME || 'gpt-4o-mini';
        this.deployment = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o-mini';
        this.apiKey = process.env.AZURE_OPENAI_API_KEY || '';
        this.apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-04-01-preview';
        this.options = {
            apiKey: this.apiKey,
            endpoint: this.endpoint,
            deployment: this.deployment,
            apiVersion: this.apiVersion,
        };
    }
    async chatWithMemory(messages: { role: string; content: string }[]) {
        const client = new AzureOpenAI(this.options);

        const response: any = await client.chat.completions.create({
            max_tokens: 4096,
            temperature: 1,
            top_p: 1,
            model: this.modelName,
            messages: messages as any[],
        });

        return response.choices?.[0]?.message?.content || 'No response';
    }

}
