const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cpuStat = require('cpu-stat')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Muestra la informacion del bot'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const dias = Math.floor(client.uptime / 86400000)
        const horas = Math.floor(client.uptime / 3600000) % 24
        const minutos = Math.floor(client.uptime / 60000) % 60
        const segundos = Math.floor(client.uptime / 10000) % 60

        cpuStat.usagePercent(function (error, percent) {
            const memoryUsage = formatBytes(process.memoryUsage().heapUsed)
            const node = process.version
            const cpu = percent.toFixed(2)

            const embed = new EmbedBuilder()
                .setTitle('Informacion del bot')
                .setColor('Random')
                .addFields(
                    { name: 'Desarrollador', value: 'Revert_b0t#5839', inline: true },
                    { name: 'Usuario', value: `${client.user.username}`, inline: true },
                    { name: 'ID', value: `${client.user.id}`, inline: true },
                    { name: 'Fecha de creacion', value: `10/02/2023` },
                    { name: 'Comando de ayuda', value: '/help' },
                    { name: 'Servidores', value: `${client.guilds.cache.size}`},
                    { name: 'Tiempo encendido', value: ` \`${dias}\` dias, \`${horas}\` minutos y \`${segundos}\` segundos` },
                    { name: 'Ping del bot', value: `${client.ws.ping}ms` },
                    { name: 'Version de node', value: `${node}` },
                    { name: 'Uso de CPU', value: `${cpu}%` },
                    { name: 'Uso de memoria', value: `${memoryUsage}` }


                )

            interaction.reply({ embeds: [embed] })
        })

        function formatBytes(a, b) {
            let c = 1024
            d = b || 2
            e = ['B', 'KB', 'MB', 'GB', 'TB']
            f = Math.floor(Math.log(a) / Math.log(c))

            return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]
        }
    },
};