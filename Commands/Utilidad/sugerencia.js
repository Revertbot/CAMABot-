const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('sugerencia')
    .setDescription('¡Manda una sugerencia y el owner la recibirá!')
    .addStringOption((option) => option.setName(`sugerencia`).setDescription(`La sugerencia que quieras enviar`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const usuario = interaction.options.getString(`sugerencia`);
        const canal = client.channels.cache.get('1084146445910806628');

        const embed = new EmbedBuilder()
        .setTitle('¡SUGERENCIA!')
        .addFields(
            { name: `Sugerencia de: ${interaction.user.tag}`, value: `${usuario}`, inline: true}
        )
        .setColor('Random')

        canal.send({ embeds: [embed] })
        await interaction.reply({ content: `¡Mensaje enviado con éxito!`, ephemeral: true })
    },
};