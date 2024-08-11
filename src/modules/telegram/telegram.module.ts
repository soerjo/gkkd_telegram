import { Module } from '@nestjs/common';
import { TelegramController } from './controller/telegram.controller';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramService } from './services/telegram.service';
import { TelegramEvent } from './controller/telegram.event';
import { GkkdUserModule } from '../gkkd-user/gkkd-user.module';

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
    GkkdUserModule,
  ],
  controllers: [TelegramController],
  providers: [
    TelegramEvent,
    TelegramService,
    //  other service
  ],
})
export class TelegramModule {}
