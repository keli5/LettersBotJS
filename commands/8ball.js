const fetch = require('node-fetch');
module.exports = {
  name: '8ball',
  description: 'Magic 8 ball. Shake it and find out the `answer`',
  usage: '<question>',
  args: true,
  async execute (client, message, args) {
    let embed = new client.discord.MessageEmbed();
    let params = encodeURIComponent(args.join(' '));
    let uri = "https://8ball.delegator.com/magic/JSON/" + params;
    fetch(uri)
      .then(response => response.json())
      .then(json => {
        embed.setTitle('Magic 8 Ball');
        embed.addField("❓Question❓", args.join(' '));
        embed.addBlankField();
        embed.addField("🎱Answer🎱", json.magic.answer);
        embed.setFooter(message.author.tag, message.author.displayAvatarURL({size: 64}));
        embed.attachFiles(["media/8ball.png"])
        embed.setThumbnail("attachment://8ball.png")
        embed.setColor("#000000")
        message.channel.send(embed)
      });
    }
}