module.exports = {
  name: 'user_info',
  description: 'Get information about yourself or another user.',
  usage: '[mention]',
  aliases: ['user', 'userinfo', 'uinfo'],
  async execute (client, message, args) {
    let victim;
      if (args[0]) {
        victim = message.mentions.users.first() || await client.users.fetch(args[0])
      } else {
        victim =  message.author;
      }
    let member = await message.guild.members.fetch(victim.id)
    let em = new client.discord.MessageEmbed();
    let sf = client.discord.SnowflakeUtil.deconstruct(victim.id);
    em.setTitle('User info for ' + victim.tag);
    em.addField('Tag', victim.tag, true);
    em.addField('ID', victim.id, true);
    em.addField('Server nick', member.nickname || 'None', true);
    em.addField('Account created', client.moment.utc(sf.date).format('LL, LTS') + ' UTC');
    em.addField('Joined guild', client.moment.utc(member.joinedAt).format('LL, LTS') + ' UTC');
    em.setColor(member.displayHexColor)
    message.channel.send(em);
  }
}