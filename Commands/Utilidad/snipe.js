const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snipe')
        .setDescription('Mira el ultimo mensaje borrado'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const msg = client.snipes.get(interaction.channel.id);
        if (!msg) return await interaction.reply({ content: 'No he encontrado ningún mensaje borrado', ephemeral: true });

        const ID = msg.author.id;
        const member = interaction.guild.members.cache.get(ID)
        const URL = member.displayAvatarURL();

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`¡MENSAJE SNIPEADO! (${member.user.tag})`)
            .setDescription(`${msg.content}`)
            .setTimestamp()
            .setFooter({ text: `ID de miembro: ${ID}`, iconURL: `${URL}` })

        await interaction.reply({ embeds: [embed] })
    }
}