import { SlashCommandBuilder } from '@discordjs/builders';
import * as exaroton from '../exaroton/manageUserLists.js';
import { PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('setconfserver')
        .setDescription('set the server to manage.')
        .addStringOption(option => option.setName('serverid').setDescription('The server to manage.').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const serverid = interaction.options.getString('serverid');

        if (!serverid) {
            await interaction.reply('You must specify a serverid to set.');
            return;
        }

        await exaroton.setClientServer(serverid);
        await interaction.reply(`Set ${serverid} as the server to manage.`);
    },
};