import { SlashCommandBuilder } from '@discordjs/builders';
import * as exaroton from '../exaroton/manageUserLists.js';

export default {
    data: new SlashCommandBuilder()
        .setName('getwhitelistusers')
        .setDescription('Gets the list of users on the whitelist.'),
    async execute(interaction) {
        const users = await exaroton.getWhitelistUsers();
        const usersString = users.join('\n');
        await interaction.reply(`Users on the whitelist:\n${usersString}`);
    },
};