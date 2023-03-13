const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { inspect } = require('util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Evalua un comando')
        .addStringOption((option) => option.setName(`comando`).setDescription(`Comando el cual quieras evaluar`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const comando = interaction.options.getString(`comando`);

        try {
            const evaled = eval(comando)
            const palabras = ['token', 'destroy']
            if (palabras.some(word => comando.content.toLowerCase().includes(word))) return interaction.reply({ content: '¡Este comando no puede ser usado!', ephemeral: true });
            const embed = new EmbedBuilder()
                .setColor('Random')
                .setTitle('Evaluado correctamente')
                .addFields(
                    {
                        name: '**Tipo:**',
                        value: `\`\`\`prolog\n${typeof (evaled)}\`\`\``,
                        inline: true,
                    },
                    {
                        name: '**Evaluado en:**',
                        value: `\`\`\`yaml\n${Date.now() - interaction.createdTimestamp}ms\`\`\``,
                        inline: true,
                    },
                    {
                        name: '**Entrada:**',
                        value: `\`\`\`js\n${comando}\`\`\``,
                    },
                    {
                        name: '**Salida:**',
                        value: `\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``,
                    }

                )

            interaction.reply({ embeds: [embed] })
        } catch (error) {
            const embedfallo = new EmbedBuilder()
                .setColor('Random')
                .addFields(
                    {
                        name: `**Entrada:**`,
                        value: `\`\`\`js\n${comando}\`\`\``,
                    },
                    {
                        name: '**Error:**',
                        value: `\`\`\`js\n${error}\`\`\``
                    }
                )

            interaction.reply({ embeds: [embedfallo] })
        }
    },
};