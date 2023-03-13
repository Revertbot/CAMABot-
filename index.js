const { // Dependencias de Discord.js
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
    Events,
    EmbedBuilder
} = require('discord.js');

const { // GatewayIntentBits
    Guilds,
    GuildMembers,
    GuildMessages
} = GatewayIntentBits;

const { // Partials
    User,
    Message,
    GuildMember,
    ThreadMember
} = Partials;

const mongoose = require('mongoose'); // Dependencia de mongoose
const cpuStat = require('cpu-stat'); // Dependencia de Cpu-Stat

const client = new Client({
    intents: 3276799,
    partials: [User, Message, GuildMember, ThreadMember],
}); // Intentos y partials

const { loadEvents } = require("./Handlers/eventHandler"); // Carpeta para cargar los eventos
client.config = require("./config.json"); // Enlace a archivo config
client.events = new Collection(); // Colección de eventos
client.commands = new Collection(); // Colección de comandos
let prefix = client.config.prefix; // Enlace de prefijo a archivo config
loadEvents(client); // Cargar los eventos
require(`./Handlers/anti-crash`)(client); // Dependencia del anticrash
require('discord-modals')(client); // Dependencia de los Discord Modals
client.snipes = new Map()

client.on('messageDelete', function (message, channel) {
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
}) // Snipes

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === 'modal') {
        await interaction.reply({ content: 'Tu modal se ha enviado correctamente', ephemeral: true })
    }

    let titulo = interaction.fields.getTextInputValue('titulo');
    let descripcion = interaction.fields.getTextInputValue('descripcion');
    let imagen = interaction.fields.getTextInputValue('imagen');
    let pie = interaction.fields.getTextInputValue('pie');

    const embedcreacion = new EmbedBuilder()
        .setTitle(`${titulo}`)
        .setDescription(`${descripcion}`)
        .setImage(`${imagen}`)
        .setFooter({ text: `${pie}` })

    await interaction.channel.send({ embeds: [embedcreacion] })
}); // Form creacion embed

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'select') {
        let opciones = ['1', '2'];

        await interaction.values.forEach(async value => {
            opciones += `${value}`
            const embedRow1 = new EmbedBuilder().setTitle('AYUDA').setColor('Random').setFooter({ text: `Servidor creado por Revert_b0t#5839` })

            if (value === 'opcion_1') {
                embedRow1.setDescription('Comandos de **UTILIDAD**').addFields(
                    { name: '/ping', value: `Muestra el ping del bot` },
                    { name: '/userinfo', value: `Muestra la informacion del usuario mencionado, o la tuya` },
                    { name: '/servericon (id del servidor)', value: `Muestra el icono del servidor que quieras (el bot debe estar metido en él)` },
                    { name: '/avatar (usuario)', value: `Visualiza el avatar de algun usuario` },
                    { name: '/botinfo', value: `Visualiza la informacion del bot` },
                    { name: '/serverinfo', value: `Visualiza la informacion del servidor` },
                    { name: '/canalinfo (canal)', value: `Visualiza la informacion de un canal o categoría` },
                    { name: '/uptime', value: `Visualiza cuanto tiempo lleva el bot encendido` },
                    { name: '/traducir (contenido) (lengua)', value: `Traduce lo que quieras a la lengua que quieras` },
                    { name: '/invitar', value: '¡Invítame a tu servidor!' },
                    { name: '/eval (línea de comando)', value: 'Prueba una línea de comando' },
                    { name: '/apoyar', value: '¡Apoya al creador del bot' },
                    { name: '/soporte', value: `¡Únete al servidor de soporte!`}
                )
            }

            if (value === 'opcion_2') {
                embedRow1.setDescription('Comandos de **DIVERSION**').addFields(
                    { name: '/8ball (pregunta)', value: `Haz una pregunta y el bot te respondera de manera aleatoria` },
                    { name: '/say (contenido)', value: `Di lo que quieras y el bot lo hara por ti` },
                    { name: '/embed', value: `Crea un embed personalizado` },
                    { name: '/encuesta (encuesta) (fecha de finalizacion) (imagen)', value: `Haz una encuesta` },
                    { name: '/dado (numero maximo)', value: 'Escoge un numero random del 0 al numero que tu elijas'},
                    { name: '/moneda', value: `Da la vuelta a una moneda` },
                )
            }

            if (value === 'opcion_3') {
                embedRow1.setDescription('**Lista de categorías**').addFields(
                    { name: '🛠️', value: 'Utilidad', inline: true },
                    { name: '😂', value: 'Diversión', inline: true },
                    { name: '👯', value: 'Interacción', inline: true}
                )
            }
            
            if (value === 'opcion_4') {
                embedRow1.setDescription('Comandos de **INTERACCIÓN**').addFields(
                    { name: '/kiss (usuario)', value: `Besa a un usuario`},
                    { name: '/ship (usuario) (usuario 2)', value: `Emparejate con un usuario`},
                    { name: '/hug (usuario)', value: `Abraza a un usuario`},
                    { name: '/comer', value: `Si tienes hambre, come`}
                )
            }

            await interaction.reply({ embeds: [embedRow1], components: [] })
        })


    }
}); // Menú comando Help

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'ping') { // Comando ping
        message.reply({ content: `El ping del bot es **${client.ws.ping} ms**` });
    }

    if (command === 'botinfo') { // Comando botinfo
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
                    { name: 'Tiempo encendido', value: ` \`${dias}\` dias, \`${horas}\` minutos y \`${segundos}\` segundos` },
                    { name: 'Ping del bot', value: `${client.ws.ping}ms` },
                    { name: 'Version de node', value: `${node}` },
                    { name: 'Uso de CPU', value: `${cpu}%` },
                    { name: 'Uso de memoria', value: `${memoryUsage}` }


                )

            message.reply({ embeds: [embed] })
        })

        function formatBytes(a, b) {
            let c = 1024
            d = b || 2
            e = ['B', 'KB', 'MB', 'GB', 'TB']
            f = Math.floor(Math.log(a) / Math.log(c))

            return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]
        }
    }

    if (command === 'ip') { // Comando ip
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`IP DEL SERVIDOR`)
            .setDescription('??????????.aternos.me:31737')
            .setFooter({ text: `Servidor creado por Revert_b0t#5839` })

        await message.reply({ embeds: [embed] })
    }

    if (command === 'uptime') { // Comando uptime
        const dias = Math.floor(client.uptime / 86400000)
        const horas = Math.floor(client.uptime / 3600000) % 24
        const minutos = Math.floor(client.uptime / 60000) % 60
        const segundos = Math.floor(client.uptime / 10000) % 60

        const embed = new EmbedBuilder()
            .setTitle(`${client.user.username} Uptime`)
            .setColor('Random')
            .setTimestamp()
            .addFields(
                { name: 'Tiempo encendido', value: ` \`${dias}\` dias, \`${horas}\` minutos y \`${segundos}\` segundos` }
            )

        message.reply({ embeds: [embed] })
    }

}); // Comandos con prefijo

client.login(client.config.token).then(() => {
    console.log('ke')
}).catch((err) => console.log(err)); // Inicio del bot
