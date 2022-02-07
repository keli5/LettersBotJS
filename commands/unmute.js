module.exports = {
  name: 'unmute',
  description: 'Unmute a guild member. Pulls a role containing "mute".',
  usage: '<mention>',
  args: true,
  permissions: 'MUTE_MEMBERS',
  async execute (client, message, args) {
   const embed = new client.discord.MessageEmbed();
   const victim = message.mentions.members.first();
   const muterole = victim.roles.cache.find(r => /^mute/i.test(r.name))
   const me = message.member;
    if (!muterole) {
       embed
        .setColor(client.embedcolors.error)
        .setTitle(victim.user.tag + " is not muted")
        return message.channel.send(embed)
     }
   try {
      embed
         .setColor(client.embedcolors.success)
         .setTitle('Unmuted ' + victim.user.tag)
      victim.roles.remove(muterole);
      message.channel.send(embed)
   } catch (e) {
      message.channel.send(e.toString())
   }
  }
 }