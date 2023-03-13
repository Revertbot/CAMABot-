const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Muestra el avatar de un usuario')
        .addUserOption((option) => option.setName(`usuario`).setDescription(`Usuario el cual quieres obtener su avatar`)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const user = interaction.options.getUser(`usuario`) || interaction.user;

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`Avatar de ${user.username}`)
            .setImage(user.displayAvatarURL({ dynamic: true }))

        interaction.reply({ embeds: [embed] })
    },
};