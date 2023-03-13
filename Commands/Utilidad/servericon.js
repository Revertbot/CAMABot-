const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('servericon')
    .setDescription('Mira el icono de un servidor'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {

        const { guild, member } = interaction;

        const embed = new EmbedBuilder()
        .setTitle(`Icono de ${guild.name}`)
        .setImage(guild.iconURL({ size: 512, dynamic: true }))
        
        await interaction.reply({ content: '¡Aquí tienes el icono del servidor!', embeds: [embed]})
    },
};