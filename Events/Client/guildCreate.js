const { InteractionType, Events } = require('discord.js');
const prisma = require('prisma');
const logger = require('logger')

module.exports = {
    name: 'guildCreate',
    once: true,
    async execute(interaction, client) {
        const { id: guildId, name } = guild;

        await prisma.guild.create({
            data: {
                guildId,
                name,
                config: {},
            },
        })
        logger.info(`El bot se ha unido a ${name}`)
    },
};