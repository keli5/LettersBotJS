module.exports = {
  name: 'ban',
  description: 'Bans a member from the guild.',
  usage: '<mention>',
  args: true,
  permissions: 'BAN_MEMBERS',
  async execute (client, message, args) {
   const embed = new client.discord.MessageEmbed();
   const victim = message.mentions.members.first();
   if (!victim.bannable) {
     embed
    .setColor(client.embedcolors.error)
    .setTitle('Error')
    .setDescription('I can\'t ban this user. This is likely due to my permissions. Check that I\'m above the user to be banned.');
    return message.channel.send(embed)
   }
   try {
     victim.ban();
      embed
         .setColor(client.embedcolors.success)
         .setTitle('Banned ' + victim.user.tag)
      message.channel.send(embed)
   } catch (e) {
      message.channel.send(e)
   }
  }
 }
