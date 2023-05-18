import { SlashCommandBuilder } from '@discordjs/builders';
import * as exaroton from '../exaroton/manageUserLists.js';

export default {
    data: new SlashCommandBuilder()
        .setName('delusertowhitelist')
        .setDescription('Manually removes a user from the whitelist.')
        .addStringOption(option => option.setName('nickname').setDescription('The user to remove from the whitelist.').setRequired(true)),
    async execute(interaction) {
        const nickname = interaction.options.getString('nickname');

        if (!nickname) {
            await interaction.reply('You must specify a nickname to set.');
            return;
        }

        await exaroton.removeUserFromWhitelist(nickname);
        await interaction.reply(`Removed ${nickname} from the whitelist.`);
    },
};