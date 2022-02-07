module.exports = {
  name: 'reload',
  description: 'Reload the bot.',
  usage: '',
  args: false,
  hidden: true,
  async execute (client, message, args) {
    if (!client.config.botOwners.includes(message.author.id)) {
      message.reply('No permission')
    } else {
    let reloadMsg = await message.channel.send('Reloading...');
    try {
    client.removeAllListeners();
    client.commands.clear();
    await client.loadConfig();
    await client.loadCommands();
    await client.loadEvents();
    } catch (e) {
      console.error(e)
      return message.reply(`Error - Failed in ${reloadMsg.createdTimestamp - message.createdTimestamp} ms. Check console for info.`)
    }
    message.reply(`OK - Reloaded ${client.fs.readdirSync('./commands/').length} commands, ${client.fs.readdirSync('./events/').length} events, config.json, and markov info.`)
    client.lastReloadTime = reloadMsg.createdTimestamp - message.createdTimestamp
    console.log('\n')
   Array.from(client.guilds).forEach(function(e) {
    console.log(e[1].name + ", owned by " + e[1].owner.user.tag)
  })
  client.updateMemCount();
    }
    
  }
}