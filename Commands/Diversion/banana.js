const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('banana')
    .setDescription('Cuanto mide tu banana?'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const cm = Math.floor(Math.random() * 100)

        const embed = new EmbedBuilder()
        .setTitle(`Tu banana mide ${cm} cm`)
        .setImage('https://img1.freepng.es/20171221/xaq/large-banana-png-clipart-5a3b9311c1d3d2.2342361015138537137939.jpg')
        .setColor('Random')

        interaction.reply({ embeds: [embed] })
    },
};