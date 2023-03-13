const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('soporte')
    .setDescription('¡Unete al servidor de soporte!'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        
        const embed = new EmbedBuilder()
        .setTitle('¡SERVIDOR DE SOPORTE!')
        .setDescription(`[Enlace](https://discord.gg/AP5S5Q6vFt)`)
        .setColor('Random')

        await interaction.reply({ embeds: [embed] })
    },
};