import { Module } from '@nestjs/common';
import { TelegramSampleService } from './services/telegram-sample.service';
import { TelegramController } from './controller/telegram.controller';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramService } from './services/telegram.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.TELEGRAM_BOT_TOKEN,
        launchOptions: process.env.TELEGRAM_BOT_WEB_HOOKS_DOMAIN
          ? {
              dropPendingUpdates: true,
              webhook: {
                domain: process.env.TELEGRAM_BOT_WEB_HOOKS_DOMAIN,
                hookPath: process.env.TELEGRAM_BOT_WEB_HOOKS_PATH,
              },
            }
          : {},
      }),
    }),
  ],
  controllers: [TelegramController],
  providers: [TelegramSampleService, TelegramService],
})
export class TelegramModule {}
