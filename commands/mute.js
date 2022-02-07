module.exports = {
  name: 'mute',
  description: 'Mute a guild member. Pulls a role containing "mute".',
  usage: '<mention>',
  args: true,
  permissions: 'MUTE_MEMBERS',
  async execute (client, message, args) {
   const embed = new client.discord.MessageEmbed();
   const muterole = message.guild.roles.cache.find(r => /^mute/i.test(r.name))
   const victim = message.mentions.members.first();
   const me = message.member;
   try {
      embed
         .setColor(client.embedcolors.success)
         .setTitle('Muted ' + victim.user.tag)
      victim.roles.add(muterole);
      message.channel.send(embed)
   } catch (e) {
      message.channel.send(e)
   }
  }
}