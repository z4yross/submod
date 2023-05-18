import { SlashCommandBuilder } from '@discordjs/builders';
import * as exaroton from '../exaroton/manageUserLists.js';
import { PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('addusertowhitelist')
        .setDescription('Manually adds a user to the whitelist.')
        .addStringOption(option => option.setName('nickname').setDescription('The user to add to the whitelist.').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const nickname = interaction.options.getString('nickname');

        if (!nickname) {
            await interaction.reply('You must specify a nickname to set.');
            return;
        }

        await exaroton.addUserToWhitelist(nickname);
        await interaction.reply(`Added ${nickname} to the whitelist.`);
    },
};