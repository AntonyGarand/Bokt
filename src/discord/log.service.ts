import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'discord.js';

@Injectable()
export class LogService {
  private logger = new Logger(LogService.name);
  public constructor(private readonly client: Client) {}

  public async log(message: string) {
    const guild = await this.client.guilds.fetch(
      process.env.DISCORD_HOME_GUILD_ID,
    );
    if (!guild) {
      this.logger.warn('Guild not found!');
      return;
    }
    const channel = await guild.channels.fetch(
      process.env.DISCORD_LOG_CHANNEL_ID,
    );
    if (!channel) {
      this.logger.warn('Channel not found!');
      return;
    }
    if (!channel.isText()) {
      this.logger.warn(`Channel is not text! It is: ${channel.type}`);
      return;
    }

    channel.send(message);
  }
}
