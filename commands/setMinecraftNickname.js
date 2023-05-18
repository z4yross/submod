import { SlashCommandBuilder } from '@discordjs/builders';

export default {
    data: new SlashCommandBuilder()
        .setName('setdiscordnickname')
        .setDescription('Sets the nickname of the user in the Discord server to the Minecraft username.')
        .addUserOption(option => option.setName('user').setDescription('The user to set the nickname of.').setRequired(true))
        .addStringOption(option => option.setName('nickname').setDescription('The nickname to set.').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const nickname = interaction.options.getString('nickname');

        if (!user) {
            await interaction.reply('You must specify a user to set the nickname of.');
            return;
        }

        if (!nickname) {
            await interaction.reply('You must specify a nickname to set.');
            return;
        }

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            await interaction.reply('The specified user is not a member of this server.');
            return;
        }

        await member.setNickname(nickname, 'Nickname set to Minecraft username.');
        await interaction.reply(`Set nickname of ${user.username} to ${nickname}.`);
    },
};