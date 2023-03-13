const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Mira cuanto tiempo lleva el bot encendido'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const dias = Math.floor(client.uptime / 86400000)
        const horas = Math.floor(client.uptime / 3600000) % 24
        const minutos = Math.floor(client.uptime / 60000) % 60
        const segundos = Math.floor(client.uptime / 10000) % 60

        const embed = new EmbedBuilder()
            .setTitle(`${client.user.username} Uptime`)
            .setColor('Random')
            .setTimestamp()
            .addFields(
                { name: 'Tiempo encendido', value: ` \`${dias}\` dias, \`${horas}\` minutos y \`${segundos}\` segundos` }
            )

        interaction.reply({ embeds: [embed] })
    },
};