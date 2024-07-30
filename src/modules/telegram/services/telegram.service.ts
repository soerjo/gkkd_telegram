import { BadRequestException, Injectable } from '@nestjs/common';
import { Hears, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { TelegrafContext } from '../../../common/interface/context.interface';

@Update()
@Injectable()
export class TelegramService {
  clientId: number;

  constructor(@InjectBot() private bot: Telegraf<TelegrafContext>) {}

  async sendMessage(user_id: number, message: string) {
    try {
      await this.bot.telegram.sendMessage(user_id, message);
    } catch (error) {
      console.log(error);
    }
  }

  async sendPict(user_id: number, image_buffer: Buffer, message?: string) {}

  @Start()
  async startCommand(ctx: Context) {
    this.clientId = ctx.update.update_id;

    const keyboard = Markup.keyboard([
      [Markup.button.contactRequest('Send phone number')],
    ])
      .resize()
      .oneTime();

    await ctx.reply('Please register with your phone number:', keyboard);
  }

  @On('contact')
  async handleContact(ctx: Context<any>) {
    const contact = ctx.message.contact;
    if (!contact) return ctx.reply('No contact information received.');

    console.log({ ctx });
    console.log({ contact: ctx.message.contact });

    const phoneNumber = contact.phone_number;
    // validate phoneNumber in db, is has been registered

    const buttons = Markup.keyboard([
      ['Report Blesscomn'],
      ['Report Pemuridan'],
      ['Report Ibadah'],
      //   ['Logout'],
    ]);

    await ctx.reply('Welcome');
    await ctx.reply(`this is what you can do... `, buttons);
  }

  @Hears('Report Blesscomn')
  async onReportBlesscomn(ctx: Context) {
    await ctx.reply(`
    [Report Blesscomn]
    > kehadiran laki-laki: _
    > kehadiran perempuan: _
    > kehadiran orang baru laki-laki: _
    > kehadiran orang baru perempuan: _
    `);
  }

  @Hears('Report Pemuridan')
  async onReportPemuridan(ctx: Context) {
    await ctx.reply(`
    [Report Pemuridan]
    > total kehadiran murid: _
    > materi buku / pembahasan: _
    `);
  }

  @Hears('Report Ibadah')
  async onReportIbadah(ctx: Context) {
    await ctx.reply(`
    [Report Ibadah]
    > kehadiran laki-laki: _
    > kehadiran perempuan: _
    > kehadiran orang baru laki-laki: _
    > kehadiran orang baru perempuan: _
    `);
  }

  @Hears(/^\[Report Blesscomn\]/)
  async handleOrderRequestBlesscomn(ctx: Context<any>) {
    const input = ctx.message.text;

    // Regular expression to capture the title and body separately
    const regex = /^\[(.*?)\]\s([\s\S]*)$/;
    const match = input.match(regex);

    if (!match) return await ctx.reply(`the format is not valid... `);
    const title = match[1].trim();
    const body = match[2].trim();

    const lines = body.split('\n').map((line) => line.trim());
    const result = {};

    lines.forEach((line) => {
      const [key, value] = line.split(':').map((part) => part.trim());
      if (key && value) {
        // Convert key to snake_case and add to result object
        const formattedKey = key.replace('> ', '').toLowerCase();
        result[formattedKey] = parseInt(value, 10);
      }
    });

    await ctx.reply(`confirmed`);
    await ctx.reply(`
    [Report Blesscomn]
    > kehadiran laki-laki: ${result['kehadiran laki-laki']}
    > kehadiran perempuan: ${result['kehadiran perempuan']}
    > kehadiran orang baru laki-laki: ${result['kehadiran orang baru laki-laki']}
    > kehadiran orang baru perempuan: ${result['kehadiran orang baru perempuan']}
    > total kehadiran orang baru: ${result['kehadiran orang baru laki-laki'] + result['kehadiran orang baru perempuan']}
    > total kehadiran: ${result['kehadiran laki-laki'] + result['kehadiran perempuan']}
    `);
  }

  @Hears(/^\[Report Pemuridan\]/)
  async handleOrderRequestPemurdian(ctx: Context<any>) {
    const input = ctx.message.text;

    // Regular expression to capture the title and body separately
    const regex = /^\[(.*?)\]\s([\s\S]*)$/;
    const match = input.match(regex);

    if (!match) return await ctx.reply(`the format is not valid... `);
    const title = match[1].trim();
    const body = match[2].trim();

    const lines = body.split('\n').map((line) => line.trim());
    const result = {};

    lines.forEach((line) => {
      const [key, value] = line.split(':').map((part) => part.trim());
      if (key && value) {
        // Convert key to snake_case and add to result object
        const formattedKey = key.replace('> ', '').toLowerCase();
        result[formattedKey] = value;
      }
    });

    await ctx.reply(`confirmed`);
    await ctx.reply(`
    [Report Pemuridan]
    > total kehadiran murid: ${result['total kehadiran murid']}
    > materi buku / pembahasan: ${result['materi buku / pembahasan']}
    `);
  }

  @Hears(/^\[Report Ibadah\]/)
  async handleOrderRequestIbadah(ctx: Context<any>) {
    const input = ctx.message.text;

    // Regular expression to capture the title and body separately
    const regex = /^\[(.*?)\]\s([\s\S]*)$/;
    const match = input.match(regex);

    if (!match) return await ctx.reply(`the format is not valid... `);
    const title = match[1].trim();
    const body = match[2].trim();

    const lines = body.split('\n').map((line) => line.trim());
    const result = {};

    lines.forEach((line) => {
      const [key, value] = line.split(':').map((part) => part.trim());
      if (key && value) {
        // Convert key to snake_case and add to result object
        const formattedKey = key.replace('> ', '').toLowerCase();
        result[formattedKey] = parseInt(value, 10);
      }
    });

    await ctx.reply(`confirmed`);
    await ctx.reply(`
    [Report Ibadah]
    > kehadiran laki-laki: ${result['kehadiran laki-laki']}
    > kehadiran perempuan: ${result['kehadiran perempuan']}
    > kehadiran orang baru laki-laki: ${result['kehadiran orang baru laki-laki']}
    > kehadiran orang baru perempuan: ${result['kehadiran orang baru perempuan']}
    > total kehadiran orang baru: ${result['kehadiran orang baru laki-laki'] + result['kehadiran orang baru perempuan']}
    > total kehadiran: ${result['kehadiran laki-laki'] + result['kehadiran perempuan']}
    `);
  }

  @Hears('Logout')
  async handleTopHunters(ctx: Context) {
    await ctx.reply('You have been logout');

    const keyboard = Markup.keyboard([
      [Markup.button.contactRequest('send phone number')],
    ])
      .resize()
      .oneTime();

    await ctx.reply('Please register with your phone number:', keyboard);
  }
}
