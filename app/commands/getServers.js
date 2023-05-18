import { SlashCommandBuilder } from '@discordjs/builders';
import { getAllServers } from '../exaroton/manageUserLists.js';
import { PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('getmcserversinfo')
        .setDescription('Get information about the minecraft servers.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const serverNames = await getAllServers();
        await interaction.reply(`The following servers are available:\n${serverNames}`);
    },
};