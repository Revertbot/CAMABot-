const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comer')
        .setDescription('Si tienes hambre, come'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {

        let image = ["https://media.indiedb.com/images/groups/1/1/84/kanzashi-eating.gif"];

        var enlace = image[Math.floor(Math.random() * image.length)];

        const embed = new EmbedBuilder()
            .setDescription(`*A* **${interaction.user.tag}** *le entró el apetito y se puso a comer*`)
            .setColor('Random')
            .setImage(enlace)

        await interaction.reply({ embeds: [embed] })

    },
};