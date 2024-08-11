import { Module } from '@nestjs/common';
import { TelegramModule } from './modules/telegram/telegram.module';
import { MainModule } from './modules/main/main.module';
import { ConfigModule } from '@nestjs/config';
import { GkkdUserModule } from './modules/gkkd-user/gkkd-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegramModule,
    MainModule,
    GkkdUserModule,
  ],
})
export class AppModule {}
