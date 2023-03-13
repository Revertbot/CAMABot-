const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { default: axios } = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('emoji')
    .setDescription('Convierte un emoji a una imagen o un gif')
    .addStringOption((option) => option.setName(`emoji`).setDescription(`Emoji el cual quieras convertir a imagen`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const emoji = interaction.options.getString(`emoji`)?.trim();

        if(emoji.startsWith('<') && emoji.endsWith('>')) {

            const id = emoji.match(/\d{15,}/g)[0];

            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
            .then(image => {
                if(image) return 'gif'
                else return 'png'
            }).catch(err => {
                return 'png'
            })

            emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality-lossless`
        }

        if(!emoji.startsWith('http')) {
            return await interaction.reply({ content: 'No puedes convertir emojis default', ephemeral: true})
        }

        if(!emoji.startsWith('https')) {
            return await interaction.reply({ content: 'No puedes convertir emojis default', ephemeral: true})
        }

        const embed = new EmbedBuilder()
        .setColor('Random')
        .setDescription('Tu emoji ha sido convertido')
        .setImage(emoji)
        .setTimestamp()
        
        await interaction.reply({ embeds: [embed] })
    },
};