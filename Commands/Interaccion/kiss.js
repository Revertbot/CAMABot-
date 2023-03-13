const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Besa a un usuario')
    .addUserOption((option) => option.setName(`usuario`).setDescription(`Usuario el cual quieres besar`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {

        const usuarioBeso = interaction.options.getUser(`usuario`);

        let gifs = ["https://i.pinimg.com/originals/67/6b/f9/676bf9c2cd4104187c9c211ee0efe130.gif", "https://steamuserimages-a.akamaihd.net/ugc/866238054439775317/35DED27B352FD5C3F13D27E7D369C66929DCB0FA/", "https://steamuserimages-a.akamaihd.net/ugc/853846034000137024/1DBE31093ADDCB510491045FE8FE85BDC4A8554C/"];

        let random = gifs[Math.floor(gifs.length * Math.random())];

        const embed = new EmbedBuilder()
        .setTitle(`${interaction.user.tag} ha besado a ${usuarioBeso.tag}`)
        .setColor('Random')
        .setImage(random)

        interaction.reply({ embeds: [embed] })

    },
};