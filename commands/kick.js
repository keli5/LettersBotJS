module.exports = {
  name: 'kick',
  description: 'Kicks a member from the guild.',
  usage: '<mention>',
  args: true,
  permissions: 'KICK_MEMBERS',
  async execute (client, message, args) {
   const embed = new client.discord.MessageEmbed();
   const victim = message.mentions.members.first();
   if (!victim.kickable) {
     embed
    .setColor(client.embedcolors.error)
    .setTitle('Error')
    .setDescription('I can\'t kick this user. This is likely due to my permissions. Check that I\'m above the user to be kicked.');
    return message.channel.send(embed)
   }
   try {
     victim.kick();
      embed
         .setColor(client.embedcolors.success)
         .setTitle('Kicked ' + victim.user.tag)
      message.channel.send(embed)
   } catch (e) {
      message.channel.send(e)
   }
  }
 }
