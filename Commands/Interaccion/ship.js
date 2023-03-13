const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Shipeate con un usuario')
        .addUserOption((option) => option.setName(`usuario`).setDescription(`Usuario el cual quieres shipear`).setRequired(true))
        .addUserOption((option) => option.setName(`usuario2`).setDescription(`Segundo usuario al que quieras shipear`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const usuarioship = interaction.options.getUser(`usuario`);
        const usuarioship2 = interaction.options.getUser(`usuario2`);

            const canvas = Canvas.createCanvas(610, 200)
            const ctx = canvas.getContext('2d')
            const bg = await Canvas.loadImage('https://img.freepik.com/foto-gratis/corazones-rosados-brillantes-costura-estampados_53876-94593.jpg')
            const heart = await Canvas.loadImage('https://spng.pngfind.com/pngs/s/97-971582_pixel-heart-undertale-heart-sprite-for-scratch-hd.png')
            const percentage = `${Math.floor(Math.random() * 100)}%`

            let myAvatar = usuarioship2.displayAvatarURL({ extension: 'jpg', dynamic: true }) // Quitar el Dynamic si da error
            myAvatar = await Canvas.loadImage(myAvatar)
            let mentionAvatar = usuarioship.displayAvatarURL({ extension: 'jpg', dynamic: true }) // Quitar el Dynamic si da error
            mentionAvatar = await Canvas.loadImage(mentionAvatar)

            ctx.save()
            ctx.filter = 'blur(3px)'
            ctx.drawImage(bg, 0, 0)
            ctx.restore()

            ctx.globalAlpha = 0.5
            ctx.fillRect(17, 17, 576, 166)
            ctx.globalAlpha = 1

            ctx.save()
            ctx.beginPath()
            ctx.arc(124.5, 100, 77.5, 0, 2 * Math.PI)
            ctx.lineWidth = 2
            ctx.strokeStyle = '#FFFFFF'
            ctx.stroke()
            ctx.clip()
            ctx.drawImage(myAvatar, 47, 22.5, 155, 155)
            ctx.restore()

            ctx.save()
            ctx.beginPath()
            ctx.arc(485.5, 100, 77.5, 0, 2 * Math.PI)
            ctx.lineWidth = 2
            ctx.strokeStyle = '#FFFFFF'
            ctx.stroke()
            ctx.clip()
            ctx.drawImage(mentionAvatar, 408, 22.5, 155, 155)
            ctx.restore()

            ctx.drawImage(heart, 227.5, 22.5, 155, 155)

            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = '#FFFFFF'
            ctx.font = '40px Arial'
            ctx.fillText(percentage, 305, 100)

            const file = new AttachmentBuilder(canvas.toBuffer('image/jpeg'), { name: 'ship.jpeg' })

            await interaction.reply({ content: `¡${usuarioship} y ${usuarioship2} tienen un ${percentage} de compatibilidad!`})
            await interaction.channel.send({ files: [file] })

    },
};