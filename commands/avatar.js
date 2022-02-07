module.exports = {
  name: 'avatar',
  description: 'Get your, or another user\'s, avatar.',
  usage: '[mention]',
  aliases: ['a'],
  category: "utility",
  async execute (client, message, args) {
    let member;
    let embed = new client.discord.MessageEmbed();
    args[1] ? a = args[1] : a = undefined
    acceptedFormats = ['png', 'jpg', 'gif', 'webp']
    a ? acceptedFormats.includes(a.toLowerCase()) ? a = a.toLowerCase() : a = undefined : a = undefined
    try {
      if (args[0]) {
        member = message.mentions.users.first() || await client.users.fetch(args[0])
      } else {
        member =  message.author;
      }
    } catch (e) {
      embed.setTitle('Error')
      embed.setColor(client.embedcolors.error)
      embed.setDescription('An invalid user was provided.')
      return message.channel.send(embed)
    }
    const avatar = a ? member.displayAvatarURL({format: a, size: 512}) : member.displayAvatarURL({size: 512});
    embed.setURL(avatar)
    embed.setTitle(member.tag + "\'s avatar");
    embed.setImage(avatar);
    embed.setColor(client.embedcolors.default);
    message.channel.send(embed)
  }
}