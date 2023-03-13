const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apoyar')
        .setDescription('Apoya al creador de este bot siguiendole en sus redes sociales ^^'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('¡APÓYAME!')
            .setDescription('Te invito a que te pases por las redes sociales de mi creador :D')
            .addFields(
                {
                    name: 'YouTube',
                    value: '[Link](https://www.youtube.com/channel/UCHsh7JDSPM5a5fcnoXYpdNQ)\n``Revert b0t``',
                    inline: true
                },
                {
                    name: 'Twitch',
                    value: '[Link](https://twitch.tv/revert_b0t)\n``revert_b0t``',
                    inline: true
                },
                {
                    name: 'Twitter',
                    value: '[Link](https://twitter.com/B0tRevert)\n``@B0tRevert``',
                    inline: true
                },
                {
                    name: 'Instagram',
                    value: '[Link](https://www.instagram.com/revert_b0t_/)\n``@revert_b0t_``',
                    inline: false
                },

            )

        await interaction.reply({ embeds: [embed] })
    },
};