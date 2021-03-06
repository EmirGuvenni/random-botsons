const embed = require('discord.js').MessageEmbed;
const Stats = require('../database/models/stats');
const {MessageAttachment} = require('discord.js');

module.exports = {
    run: async(client, message) => {
        // Roll the dice
        let roll = Math.floor((Math.random() * 6) + 1);
        // Get the die image
        let attachment = new MessageAttachment(`./src/images/dice/face-${roll}.png`, `face-${roll}.png`);

        // Create an embed
        let rollEmbed = new embed()
            .setColor(0xFCFCFC)
            .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
            .setTitle("Rolled the dice")
            .setDescription(`Dice: ${roll}`)
            .attachFiles(attachment)
            .setImage(`attachment://face-${roll}.png`);
        // Send the embed
        await message.channel.send(rollEmbed);

        try {
            const reqStats = await Stats.findOne();
            reqStats.dice++;
            reqStats.save();
        }
        catch(err) {
            client.handlers.get("error")(client, err, __filename);
        }
    },
    aliases: ["roll"],
    description: "rolls the dice"
}
