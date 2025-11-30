import { BOTNORREA_SERVICE } from "../../constants";

type BotnoreaConfig = {
  apiUrl: string;
  username: string;
  password: string;
};

export class BotnoreaAPI {
  private config: BotnoreaConfig;
  private authHeader: string;

  constructor(config: BotnoreaConfig) {
    this.config = config;
    this.authHeader = `Basic ${btoa(`${config.username}:${config.password}`)}`;
  }

  async sendTelegramMessage(text: string, chatId: number, replyToMessageId?: number): Promise<Response> {
    return fetch(`${this.config.apiUrl}/${BOTNORREA_SERVICE}/send-message`, {
      method: 'POST',
      headers: {
        Authorization: this.authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service: BOTNORREA_SERVICE,
        text,
        chat_id: chatId,
        reply_parameters: { chat_id: chatId, message_id: replyToMessageId },
      }),
    });
  }
}
