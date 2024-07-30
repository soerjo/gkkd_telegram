import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getBotToken } from 'nestjs-telegraf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bot = app.get(getBotToken());
  app.use(bot.webhookCallback(process.env.TELEGRAM_BOT_PATH));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
