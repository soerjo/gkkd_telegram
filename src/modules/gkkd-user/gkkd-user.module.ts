import { Module } from '@nestjs/common';
import { GkkdUserService } from './gkkd-user.service';

@Module({
  providers: [GkkdUserService],
  exports: [GkkdUserService],
})
export class GkkdUserModule {}
