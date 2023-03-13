const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Crea un embed personalizado'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setTitle('CREACION DE EMBED')
            .setCustomId('modal')

        const titulo = new TextInputBuilder()
            .setCustomId('titulo')
            .setRequired(true)
            .setLabel('Titulo del embed')
            .setStyle(TextInputStyle.Short)

        const descripcion = new TextInputBuilder()
            .setCustomId('descripcion')
            .setRequired(true)
            .setLabel('Descripcion del embed')
            .setStyle(TextInputStyle.Paragraph)

        const imagen = new TextInputBuilder()
            .setCustomId('imagen')
            .setRequired(true)
            .setLabel('Imagen del embed')
            .setPlaceholder('Coloca aqui el enlace de la imagen')
            .setStyle(TextInputStyle.Paragraph)

        const pie = new TextInputBuilder()
            .setCustomId('pie')
            .setRequired(true)
            .setLabel('Pie del embed')
            .setStyle(TextInputStyle.Short)

        const firstActionRow = new ActionRowBuilder().addComponents(titulo)
        const secondActionRow = new ActionRowBuilder().addComponents(descripcion)
        const thirdActionRow = new ActionRowBuilder().addComponents(imagen)
        const fourActionRow = new ActionRowBuilder().addComponents(pie)

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourActionRow)

        interaction.showModal(modal)

    },
};