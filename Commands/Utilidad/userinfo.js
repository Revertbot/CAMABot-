const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Te mostrare infrormacion del usuario que tu quieras')
        .addUserOption((option) => option.setName(`usuario`).setDescription(`Usuario el cual quieres obtener informacion`)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const user = interaction.options.getUser(`usuario`) || interaction.user;
        const miembro = await interaction.guild.members.fetch(user.id);
        let member = await user.fetch({ force: true });

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}` })
            .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
            .setImage(user.bannerURL({ size: 512 }))
            .setTitle(`Informacion de ${user.username}`)
            .addFields(
                { name: `Informacion General`, value: `**ID:** ${user.id}` },
                { name: `Creacion de cuenta`, value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: `Se unio al servidor`, value: `<t:${parseInt(miembro.joinedAt / 1000)}:R>`, inline: true },
                { name: `Banner del usuario`, value: user.bannerURL() ? "** **" : "Este usuario no tiene un banner" }
            )

        await interaction.reply({ embeds: [embed] })
    },
};