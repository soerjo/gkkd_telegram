import { Controller, Get, Query } from '@nestjs/common';
import { TelegramService } from '../services/telegram.service';
import { SendMessageDto } from '../dto/send-message.dto';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  // @Post()
  // create(@Body() createTelegramDto: CreateTelegramDto) {
  //   return this.telegramService.create(createTelegramDto);
  // }

  @Get()
  sendMessage(@Query() dto: SendMessageDto) {
    this.telegramService.sendMessage(dto.user_id, dto.message);
    return { message: 'success' };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.telegramService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTelegramDto: UpdateTelegramDto) {
  //   return this.telegramService.update(+id, updateTelegramDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.telegramService.remove(+id);
  // }
}
