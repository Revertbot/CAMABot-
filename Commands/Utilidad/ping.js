const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Calcula el ping del bot'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    execute(interaction, client) {
        interaction.reply({ content: `El ping del bot es **${client.ws.ping} ms**` });
    },
};