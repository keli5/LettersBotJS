module.exports = {
  name: 'ping',
  description: 'Check the bot\'s ping.',
  usage: '',
  args: false,
  async execute (client, message, args) {
    let resMsg = await message.channel.send('🏓 Ping!');
    resMsg.edit('🏓 Ponged in ' + Math.round((resMsg.createdTimestamp - message.createdTimestamp)) + 'ms.');
  }
}