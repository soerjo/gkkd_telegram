import { Injectable } from '@nestjs/common';
import {
  Hears,
  Help,
  Start,
  Update,
  InjectBot,
  Action,
  On,
} from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { TelegrafContext } from '../../../common/interface/context.interface';

@Update()
@Injectable()
export class TelegramSampleService {
  clientId: number;

  constructor(@InjectBot() private bot: Telegraf<TelegrafContext>) {}

  async sendMessage() {
    const buttons = Markup.keyboard([['🦍 Become a Hunter', '🔥 TOP Hunters']]);
    const id = 647414249;
    await this.bot.telegram.sendMessage(id, 'yeah..', buttons);
  }

  getData(): { message: string } {
    return { message: 'Welcome to server!' };
  }

  // @Start()
  async startCommand(ctx: Context) {
    const buttons = Markup.keyboard([['🦍 Become a Hunter', '🔥 TOP Hunters']]);

    this.clientId = ctx.update.update_id;
    console.log(ctx.message.chat.id);
    await ctx.reply('Welcome', buttons);
  }

  // @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @Action('mantab')
  async onMantab(ctx: Context) {
    await ctx.reply('mantab 👍');
  }

  @Action('keren')
  async onKeren(ctx: Context) {
    await ctx.reply('keren 👍');
  }

  @Action('imut')
  async onImut(ctx: Context) {
    await ctx.reply('imut 👍');
  }

  @Hears('bro')
  async hearsBro(ctx: Context) {
    const buttons = Markup.keyboard([['🦍 Become a Hunter', '🔥 TOP Hunters']]);
    console.log({ message: ctx.message });
    this.clientId = ctx.message.chat.id;
    await ctx.reply('yeah...', buttons);
  }

  @Hears('🦍 Become a Hunter')
  async handleBecomeHunter(ctx: Context) {
    await ctx.reply(
      `Welcome to the Hunter club! Here's what you can do...`,
      Markup.removeKeyboard(),
    );
    // Additional logic for this button can go here
  }

  @Hears('🔥 TOP Hunters')
  async handleTopHunters(ctx: Context) {
    await ctx.reply('Here are the top hunters:', Markup.removeKeyboard());
    // Additional logic for this button can go here
  }

  @Hears('hi')
  async hearsHi(ctx: Context) {
    const options = Markup.inlineKeyboard([
      Markup.button.callback('Coke', 'mantab'),
      Markup.button.callback('Dr Pepper', 'keren'),
      Markup.button.callback('Pepsi', 'imut'),
    ]);
    console.log({ message: ctx.message });
    this.clientId = ctx.message.chat.id;
    await ctx.reply('yeah...', options);
  }

  @Hears('yup')
  async getForm(ctx: Context) {
    const keyboard = Markup.keyboard([
      [Markup.button.contactRequest('Send phone number')],
    ])
      .resize()
      .oneTime();

    await ctx.reply('Please share your phone number:', keyboard);
  }

  // @On('contact')
  async handleContact(ctx: Context<any>) {
    const contact = ctx.message.contact;

    if (contact) {
      const phoneNumber = contact.phone_number;
      const firstName = contact.first_name;
      const lastName = contact.last_name;

      await ctx.reply(
        `Thank you for sharing your phone number, ${firstName}!`,
        Markup.removeKeyboard(),
      );
      await ctx.reply(`Phone Number: ${phoneNumber}`, Markup.removeKeyboard());

      // You can also store the phone number or perform other actions here
    } else {
      await ctx.reply('No contact information received.');
    }
  }
}
