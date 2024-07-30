import { Module } from '@nestjs/common';
import { TelegramModule } from './modules/telegram/telegram.module';
import { MainModule } from './modules/main/main.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegramModule,
    MainModule,
  ],
})
export class AppModule {}
