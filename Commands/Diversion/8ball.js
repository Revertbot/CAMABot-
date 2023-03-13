const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Hazme una pregunta y te respondere con un "Si", "No", "Puede que si", "Puede que no"')
        .addStringOption((option) => option.setName(`pregunta`).setDescription(`Escribe aqui tu pregunta`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const pregunta = interaction.options.getString(`pregunta`);
        let respuestas = [
            "Sí",
            "No",
            "Puede que sí",
            "Puede que no",
        ]
        const respuesta = Math.floor(Math.random() * respuestas.length);

        const embed = new EmbedBuilder()
            .setTitle(`Pregunta de ${interaction.user.username}`)
            .addFields(
                { name: `Pregunta`, value: `${pregunta}` },
                { name: `Respuesta`, value: `${respuestas[respuesta]}` }
            )
            .setColor('Random')

        await interaction.reply({ embeds: [embed] })
    },
};