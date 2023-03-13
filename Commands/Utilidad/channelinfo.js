const { Collection, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const dayjs = require('dayjs');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('canalinfo')
        .setDescription('Mira la informacion de un canal')
        .addChannelOption((option) => option.setName(`canal`).setDescription(`Canal el cual quieres obtener informacion`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {

        const channelTypes = {
            0: 'Texto',
            2: 'Voz',
            4: 'Categoría',
            5: 'Anuncios',
            10: 'Hilo de anuncio',
            11: 'Hilo público',
            12: 'Hilo privado',
            13: 'Escenario',
            15: 'Foro',
        };

        const { guild, member, options } = interaction;

        await guild.members.fetch()

        const channel = options.getChannel(`usuario`) ?? interaction.channel;

        const { id, type, createdAt, members } = channel;
        let memberCount;
        let botCount;

        if (members instanceof Collection) {
            memberCount = members.size
            botCount = members.filter((member) => member.user.bot).size
        } else {
            memberCount = members.cache.size
            botCount = members.cache.filter((member) => member.user?.bot).size
        }

        const embed = new EmbedBuilder()
            .setTitle('INFORMACIÓN DE CANAL')
            .setColor('Random')
            .addFields(
                { 
                    name: 'Canal', 
                    value: `${channel}`, 
                    inline: true 
                },
                {
                    name: 'ID',
                    value: `\`${id}\``,
                    inline: true,
                },
                {
                    name: 'Tipo',
                    value: `\`${channelTypes[type]}\``,
                    inline: true,
                },
                {
                    name: 'Miembros',
                    value: `\`${memberCount}\``,
                    inline: true,
                },
                {
                    name: 'Bots',
                    value: `\`${botCount}\``,
                    inline: true,
                },
                {
                    name: 'Fecha de creación',
                    value: `\`${dayjs(createdAt).format('DD MMM YYYY')}\``,
                    inline: true,
                },
            )
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })


    },
};