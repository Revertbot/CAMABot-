const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Abraza a un usuario')
    .addUserOption((option) => option.setName(`usuario`).setDescription(`Usuario el cual quieres abrazar`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {

        const usuario = interaction.options.getUser(`usuario`);

        let gifts = ['https://nekocdn.com/images/i18M9cgjC.gif', 'https://nekocdn.com/images/hNM95XLF.gif']

        let random = gifs[Math.floor(gifs.length * Math.random())];

        const embed = new EmbedBuilder()
        .setTitle(`${interaction.user.tag} ha abrazado a ${usuario.tag}`)
        .setColor('Random')
        .setImage(random)

        interaction.reply({ embeds: [embed] })
    },
};