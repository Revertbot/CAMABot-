const { InteractionType } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    once: true,
    async execute(interaction, client) {
        if(interaction.isContextMenuCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const contextCommand = commands.get(commandName);
            if(!contextCommand) return;

            try{
                await contextCommand.execute(interaction, client);
            } catch (error) {
                console.error(error)
            }
        }
    },
};