import { Injectable } from '@nestjs/common';
import { Context, ContextOf, SlashCommand } from 'necord';
import { LogService } from './log.service';

@Injectable()
export class DiscordService {
  constructor(private logService: LogService) {}
  @SlashCommand('ping', 'If you ping me, I will pong you.')
  public async onPing(@Context() [interaction]: ContextOf<'slashCommand'>) {
    interaction.reply({ content: 'Pong!' });
    this.logService.log(`User ${interaction.user.username} used "Ping"`);
  }
}
