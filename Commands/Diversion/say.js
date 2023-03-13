const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Di lo que quieras y el bot lo hara por ti')
        .addStringOption((option) => option.setName(`frase`).setDescription(`Lo que quieras decir`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const frasedeusuario = interaction.options.getString(`frase`);

        await interaction.channel.send({ content: `${frasedeusuario}` });
        await interaction.reply({ content: `¡Mensaje enviado con éxito!`, ephemeral: true })
    },
};