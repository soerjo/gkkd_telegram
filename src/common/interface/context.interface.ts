import { Scenes } from 'telegraf';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TelegrafContext extends Scenes.SceneContext {}
export interface TelegramMessage {
  message_id: number;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
  };
  chat: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    type: string;
  };
  date: number;
  text: string;
}
