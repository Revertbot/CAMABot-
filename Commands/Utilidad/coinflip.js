const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('moneda')
    .setDescription('Da la vuelta a una moneda'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {

        const lados = ['cara', 'cruz']

        const respuesta = Math.floor(Math.random() * lados.length)

        const embed = new EmbedBuilder()
        .setTitle('¡Giro de moneda!')
        .setDescription(`He girado una moneda, y me ha salido **${lados[respuesta]}**`)

        await interaction.reply({ embeds: [embed]})
    },
};