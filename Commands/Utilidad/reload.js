const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { loadCommands } = require('../../Handlers/commandHandler');
const { loadEvents } = require('../../Handlers/eventHandler');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Recarga los comandos y eventos')
        .addSubcommand(subcommand =>
            subcommand.setName('comandos')
                .setDescription('Recarga tus comandos')
        )
        .addSubcommand(subcommand =>
            subcommand.setName('eventos')
                .setDescription('Recarga tus eventos')
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const { user } = interaction;
        const sub = interaction.options.getSubcommand();

        if (user.id !== '856937763399532545') return interaction.reply({ content: '¡No tienes los suficientes permisos para ejecutar este comando!', ephemeral: true })

        const embed = new EmbedBuilder()
        .setTitle('Desarrollador')
        .setColor('Random')

        switch (sub) {
            case 'comandos': {
                loadCommands(client)
                interaction.reply({ embeds: [embed.setDescription('¡Comandos recargados con éxito!')] })
                console.log(`${user} ha recargado los comandos`)
            }
            break;

            case 'eventos': {
                loadEvents(client)
                interaction.reply({ embeds: [embed.setDescription('¡Eventos recargados con éxito!')] })
                console.log(`${user} ha recargado los eventos`)
            }
            break;
        }

    },
};