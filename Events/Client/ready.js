const { Activity, Partials, ActivityType, Client, GatewayIntentBits  } = require('discord.js');
const { loadCommands } = require('../../Handlers/commandHandler');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('El cliente se ha iniciado correctamente');
        loadCommands(client);

        client.user.setPresence({
            activities: [{
                name: `¡Estamos en ${client.guilds.cache.size} servidores!`, 
                type: ActivityType.Streaming,
                url: 'https://twitch.tv/revert_b0t',
            }],
        });
    },
};