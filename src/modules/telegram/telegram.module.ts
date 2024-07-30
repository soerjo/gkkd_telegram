import { Module } from '@nestjs/common';
import { TelegramSampleService } from './services/telegram-sample.service';
import { TelegramController } from './controller/telegram.controller';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramService } from './services/telegram.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        return {
          token: token,
        };
      },
    }),
  ],
  controllers: [TelegramController],
  providers: [TelegramSampleService, TelegramService],
})
export class TelegramModule {}
