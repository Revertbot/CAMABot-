const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('invitar')
    .setDescription('Invita al bot al servidor'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle('¡INVÍTAME A TU SERVIDOR!')
        .setDescription(`[Enlace](https://discord.com/api/oauth2/authorize?client_id=1073676298184048650&permissions=8&scope=bot%20applications.commands)`)
        .setColor('Random')
        
        interaction.reply({ embeds: [embed] })
    },
};