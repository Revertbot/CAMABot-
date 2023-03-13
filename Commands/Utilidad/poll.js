const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('encuesta')
        .setDescription('Crea una encuesta')
        .addStringOption((option) =>
            option.setName('encuesta')
                .setDescription('Descripcion de la encuesta')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('finalizacion')
                .setDescription('Di cuando finaliza la encuesta')
                .setRequired(false)
        )
        .addStringOption((option) =>
            option.setName('imagen')
                .setDescription('Enlace de la imagen que quieras colocar en el embed')
                .setRequired(false)
        ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const contenidoencuesta = interaction.options.getString(`encuesta`);
        const finalizarencuesta = interaction.options.getString(`finalizacion`) || 'Sin fecha límite';
        const imagenencuesta = interaction.options.getString(`imagen`) || 'https://color-hex.org/colors/2b2d31.png';

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(contenidoencuesta)
            .setFooter({ text: `${finalizarencuesta}` })
            .setImage(`${imagenencuesta}`)
            .setTimestamp()

        try {
            const m = await interaction.channel.send({ embeds: [embed] });
            await m.react('👍');
            await m.react('👎');
            await interaction.reply({ content: 'La encuesta ha sido enviada correctamente', ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    },
}