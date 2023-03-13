const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('revertir')
    .setDescription('Da la vuelta a un texto')
    .addStringOption((option) => option.setName(`texto`).setDescription(`Texto que quieres revertir`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const texto = interaction.options.getString(`texto`);

        const vuelta = texto.split('').reverse()

        interaction.reply({ content: `${vuelta}`})
    },
};