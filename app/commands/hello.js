import { SlashCommandBuilder } from '@discordjs/builders';

export default {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with Hello, World!'),
    async execute(interaction) {
        await interaction.reply('Hello, World!');
    },
};