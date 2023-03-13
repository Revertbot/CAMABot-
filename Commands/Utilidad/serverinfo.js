const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const { stripIndent } = require('common-tags');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Mira la informacion del servidor'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const verificationLevels = [
            '`Ninguno`',
            '`Bajo`',
            '`Medio`',
            '`Alto`',
            '`Muy alto`',
        ];
        const notifications = ['`Todas`', '`Menciones`']
        const premiumTiers = ['`Ninguno`', '`Tier 1`', '`Tier 2`', '`Tier 3`'];

        const { user, guild, member } = interaction;
        const { id, channels, roles, members, emojis, createdAt } = guild;

        await members.fetch()
        const memberCount = members.cache.size;
        const botCount = members.cache.filter((member) => member.user.bot).size;
        const online = members.cache.filter(
            (member) => member.presence?.status === 'online',
        ).size;
        const offline = members.cache.filter(
            (member) =>
                member.presence?.status === 'offline' || member.presence?.status === undefined,
        ).size;
        const dnd = members.cache.filter(
            (member) => member.presence?.status === 'dnd',
        ).size;
        const afk = members.cache.filter(
            (member) => member.presence?.status === 'idle',
        ).size;

        const channelCount = channels.cache.size;
        const textChannels = channels.cache.filter(
            (channel) => channel.type === ChannelType.GuildText && channel.viewable,
        ).size;
        const forumChannels = channels.cache.filter(
            (channel) => channel.type === ChannelType.GuildForum && channel.viewable,
        ).size
        const voiceChannels = channels.cache.filter(
            (channel) =>
                channel.type === ChannelType.GuildVoice ||
                channel.type === ChannelType.GuildStageVoice,
        ).size
        const newsChannels = channels.cache.filter(
            (channel) => channel.type === ChannelType.GuildAnnouncement,
        ).size
        const categoryChannels = channels.cache.filter(
            (channel) => channel.type === ChannelType.GuildCategory,
        ).size

        const roleCount = roles.cache.size - 1

        const emojiCount = emojis.cache.size

        const serverStats = stripIndent`
            Miembros    :: [ ${memberCount} ]
                        :: ${online} Miembros online
                        :: ${dnd} Miembros en no molestar
                        :: ${afk} Miembros AFK
                        :: ${offline} Miembros desconectados
                        :: ${botCount} Bots

            Canales     :: [ ${channelCount} ]
                        :: ${textChannels} Canales de texto
                        :: ${forumChannels} Hilos
                        :: ${voiceChannels} Canales de voz
                        :: ${newsChannels} Canales de anuncio
                        :: ${categoryChannels} Categorías

            Roles       :: [ ${roleCount} ]

            Emojis      :: [ ${emojiCount} ]
        `

        const embed = new EmbedBuilder()
            .setTitle('¡INFORMACIÓN DEL SERVIDOR!')
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor('Random')
            .addFields(
                {
                    name: 'ID',
                    value: `\`${id}\``,
                    inline: true,
                },
                {
                    name: `Owner`,
                    value: `${members.cache.get(guild.ownerId)}`,
                    inline: true,
                },
                {
                    name: 'Nivel de verificación',
                    value: verificationLevels[guild.verificationLevel],
                    inline: true,
                },
                {
                    name: 'Canal de reglas',
                    value: guild.rulesChannel ? `${guild.rulesChannel}` : '`No establecido`',
                    inline: true,
                },
                {
                    name: 'Canal de sistema',
                    value: guild.systemChannel ? `${guild.systemChannel}` : '`No establecido`',
                    inline: true,
                },
                {
                    name: 'Canal AFK',
                    value: guild.afkChannel ? `${guild.afkChannel.name}` : '`No establecido`',
                    inline: true,
                },
                {
                    name: 'Notificaciones predeterminadas',
                    value: notifications[guild.defaultMessageNotifications],
                    inline: true,
                },
                {
                    name: 'Programa Partner',
                    value: `\`${guild.partnered}\``,
                    inline: true,
                },
                {
                    name: 'Tier premium',
                    value: premiumTiers[guild.premiumTier],
                    inline: true,
                },
                {
                    name: 'Verificación',
                    value: `\`${guild.verified}\``,
                    inline: true,
                },
                {
                    name: 'Fecha de creación',
                    value: `\`${dayjs(createdAt).format('DD MMM YYYY')}\``,
                    inline: true,
                },
                {
                    name: 'Stats del servidor',
                    value: `\`\`\`asciidoc\n${serverStats}\`\`\``,
                },
            )
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })

    },
};