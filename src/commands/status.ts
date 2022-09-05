import { CommandInteraction } from 'discord.js';
import { Discord, Slash } from 'discordx';
import { createEmbed } from '../utils/embed';
import { getMinehutStatus, MinehutStatus, Status } from '../utils/minehut';

@Discord()
export class StatusCommand {
	@Slash({ name: 'status', description: 'View the status of Minehut Services' })
	private async status(interaction: CommandInteraction) {
		await interaction.deferReply();

		getMinehutStatus().then((data: MinehutStatus) => {
			interaction.followUp({
				embeds: [
					createEmbed(
						`**Minehut Proxy**: ${data.minecraft_proxy} ${this.getIcon(data.minecraft_proxy)}` +
							`\n**Minehut Java**: ${data.minecraft_java} ${this.getIcon(data.minecraft_java)}` +
							`\n**Minehut Bedrock**: ${data.minecraft_bedrock} ${this.getIcon(
								data.minecraft_bedrock
							)} ${
								data.latest_bedrock_version.startsWith(data.bedrock_version)
									? ''
									: `*(${data.bedrock_version} -> ${data.latest_bedrock_version})*`
							}` +
							`\n**Minehut API**: ${data.api} ${this.getIcon(data.api)}` +
							`\n` +
							`\n *This information is automatic, please refer to <#240269653358805003> for status updates*`
					).setTitle('📈 Minehut Status')
				]
			});
		});
	}

	private getIcon(status: Status): string {
		switch (status.toLowerCase()) {
			case 'working':
				return '🟢';
			case 'degraded':
			case 'outdated':
				return '🟡';
			case 'offline':
				return '🔴';
			default:
				return '❓';
		}
	}
}
