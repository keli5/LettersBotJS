module.exports = {
  name: 'guildinfo',
  description: 'Get a collection of information about the guild.',
  usage: '',
  aliases: ['guild', 'guild_info'],
  args: false,
  async execute (client, message, args) {
    let g     = message.guild;
    icon      = g.iconURL({size: 512})
    let embed = new client.discord.MessageEmbed()
      .setTitle(g.name)
      .setThumbnail(icon)
      .setColor(client.embedcolors.default)
      .addField('Created', client.moment(g.createdAt).format("LL, LTS") + " UTC",true)
      .addField('Owner', g.owner, true)
      .addField('Member count', g.members.cache.size, true)
      .addField('ID', g.id, true)
      .addField('Channels', g.channels.cache.size, true)
      .addField('Emojis', g.emojis.cache.size, true)
      .addField('Roles', g.roles.cache.size, true)
      .addField('Region', g.region, true)
      .addField('Boosts', g.premiumSubscriptionCount || 0, true)
      .setFooter(`${g.name}/${g.id}`, icon);
    message.channel.send(embed)
  }
}