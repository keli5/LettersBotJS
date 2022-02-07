module.exports = {
  name: 'updateguildblacklist',
  description: '[OWNER ONLY] Re-check the guild blacklist, and remove newly blacklisted servers.',
  usage: '',
  args: false,
  hidden: true,
  async execute (client, message, args) {
  if (message.author.id == client.config.botOwner) {
    Array.from(client.guilds).forEach(function(e) {
      if (client.config.blacklistedGuilds.includes(e[0])) {
        guild = client.guilds.get(e[0]);
        guild.leave();
      }
    })
  } else {
    message.reply('Only Letters can run this command. Now, you should be running.')
  }
  }
}