import { Module } from '@nestjs/common';
import { Intents } from 'discord.js';
import { NecordModule } from 'necord';
import { DiscordService } from './discord.service';
import { LogService } from './log.service';
import { RSNCommand } from './rsn.command';

@Module({
  imports: [
    NecordModule.forRoot({
      token: process.env.DISCORD_BOT_TOKEN,
      intents: [
        // Used to get the guilds data: Roles, colors, channels, etc.
        Intents.FLAGS.GUILDS,
      ],
      development:
        process.env.NODE_ENV !== 'production'
          ? [process.env.DISCORD_HOME_GUILD_ID]
          : undefined,
    }),
  ],
  providers: [DiscordService, LogService, RSNCommand],
})
export class DiscordModule {}
