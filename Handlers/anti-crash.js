const { EmbedBuilder, WebhookClient, Embed } = require(`discord.js`);
const { inspect } = require('util');
const webhook = new WebhookClient({
    url: 'https://discord.com/api/webhooks/1075838242500390912/90nJZSvESPbVtT3y-58zvPK1yCp2Nn-BqOEG8tzKMNpgNF6AqHcwVDYbK2uYRuToZW6q'
});

module.exports = (client) => {
    const embed = new EmbedBuilder().setColor('DarkRed');

    client.on('error', (err) => {
        console.log(err);

        embed
        .setTitle('Discord API Error')
        .setURL('https://discordjs.guide/popular-topics/errors.html#api-errors')
        .setDescription(`\`\`\`${inspect(err, {depth: 0}).slice(0, 1000)}\`\`\``)
        .setTimestamp();

        return webhook.send({embeds: [embed]});
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.log(reason, '\n', promise);

        embed
        .setTitle('Unhandled Rejection/Catch')
        .setURL('https://nodejs.org/api/process.html#event-unhandledrejection')
        .addFields({
            name: 'Reason',
            value: `\`\`\`${inspect(reason, {depth: 0}).slice(0, 1000)}\`\`\``
        },
        {
            name: 'promise',
            value: `\`\`\`${inspect(promise, {depth: 0}).slice(0, 1000)}\`\`\``
        })
        .setTimestamp();

        return webhook.send({embeds: [embed]})
    });

    process.on('uncaughtException', (err, origin) => {
        console.log(err, '\n', origin);

        embed
        .setTitle('Uncaught Exception')
        .setURL('https://nodejs.org/api/process.html#event-uncaughtException')
        .addFields({
            name: 'err',
            value: `\`\`\`${inspect(err, {depth: 0}).slice(0, 1000)}\`\`\``
        },
        {
            name: 'Origin',
            value: `\`\`\`${inspect(origin, {depth: 0}).slice(0, 1000)}\`\`\``
        })
        .setTimestamp();

        return webhook.send({embeds: [embed]})
    });

    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(err, '\n', origin);

        embed
        .setTitle('Uncaught Exception Monitor')
        .setURL('https://nodejs.org/api/process.html#event-uncaughtExceptionmonitor')
        .addFields({
            name: 'err',
            value: `\`\`\`${inspect(err, {depth: 0}).slice(0, 1000)}\`\`\``
        },
        {
            name: 'Origin',
            value: `\`\`\`${inspect(origin, {depth: 0}).slice(0, 1000)}\`\`\``
        })
        .setTimestamp();

        return webhook.send({embeds: [embed]})
    });

    process.on('warning', (warn) => {
        console.log(warn);

        embed
        .setTitle('Uncaught Exception Monitor Warning')
        .setURL('https://nodejs.org/api/process.html#event-warning')
        .addFields(
        {
            name: 'Warning',
            value: `\`\`\`${inspect(warn, {depth: 0}).slice(0, 1000)}\`\`\``
        })
        .setTimestamp();

        return webhook.send({embeds: [embed]})
    });
}