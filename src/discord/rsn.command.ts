import { Injectable } from '@nestjs/common';
import {
  Context,
  ContextOf,
  Guilds,
  Options,
  SlashCommand,
  StringOption,
} from 'necord';
import { LogService } from './log.service';

const roleId = process.env.DISCORD_MEMBER_ROLE_ID;

export class RSNDto {
  @StringOption({
    name: 'rsn',
    description: 'The RSN of your main',
    required: true,
  })
  rsn: string;
}

@Injectable()
export class RSNCommand {
  constructor(private logService: LogService) {}

  @Guilds([process.env.DISCORD_HOME_GUILD_ID])
  @SlashCommand('rsn', 'Register your RSN')
  public async onRSN(
    @Context() [interaction]: ContextOf<'slashCommand'>,
    @Options() { rsn }: RSNDto,
  ) {
    await interaction.deferReply({ ephemeral: true });
    this.logService.log(
      `User <@${interaction.user.id}> set their RSN to ${rsn}`,
    );
    const member = await interaction.guild.members.fetch(interaction.user.id);
    try {
      await member.setNickname(rsn);
      await member.roles.add(roleId);
      interaction.followUp(
        'Successfully updated your RSN!\nWelcome to the server!',
      );
    } catch (e) {
      interaction.followUp(`Something went wrong!\nDo I lack permissions?`);
      console.error(e);
    }
  }
}
