const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ComponentType, ActionRowBuilder, SelectMenuBuilder, StringSelectMenuBuilder, Events } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Recibe ayuda con la lista de comandos'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const menu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setMinValues(1)
                    .setMaxValues(2)
                    .setPlaceholder('Nada seleccionado')
                    .addOptions(
                        {
                            label: 'Lista de categorias',
                            description: 'La lista de categorias',
                            value: 'opcion_3',
                        },
                        {
                            label: 'Utilidad',
                            description: 'Visualiza los comandos mas utiles',
                            value: 'opcion_1',
                        },
                        {
                            label: 'Diversion',
                            description: 'Visualiza los comando mas utiles',
                            value: 'opcion_2',
                        },
                        {
                            label: 'Interaccion',
                            description: 'Visualiza los comandos de interaccion',
                            value: 'opcion_4'
                        },

                    ),
            );

        await interaction.reply({ content: '¡Escoge en que categoria quieres recibir ayuda!', components: [menu] })
    },
};