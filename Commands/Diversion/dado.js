const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('dado')
    .setDescription('Elije un numero al azar')
    .addStringOption(option => option.setName(`numero_maximo`).setDescription(`Numero maximo del azar`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {

        const numeromax = interaction.options.getString(`numero_maximo`);

        const random = Math.floor(numeromax * Math.random())

        const embed = new EmbedBuilder()
        .setTitle('NUMERO ALEATORIO')
        .addFields(
            {
                name: 'Numero máximo',
                value: `${numeromax}`,
                inline: true
            },
            {
                name: 'Resultado',
                value: `${random}`
            }
        )
        .setColor('Random')

        interaction.reply({ embeds: [embed]})

    },
};