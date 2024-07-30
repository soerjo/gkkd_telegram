import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getBotToken } from 'nestjs-telegraf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bot = app.get(getBotToken());
  console.log({ do: process.env.TELEGRAM_BOT_WEB_HOOKS_PATH });
  app.use(bot.webhookCallback(process.env.TELEGRAM_BOT_WEB_HOOKS_PATH));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
