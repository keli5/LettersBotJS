module.exports = {
  name: 'kill',
  description: 'Kill. Kill. Kill. Kill. Kill. Kill. Kill. Kill. Kill. Kill. Kill. Kill. Kill. Kill. Kill. Kill. Kill. Kill. Kill. Ki',
  usage: '<what to kill>',
  args: true,
  async execute (client, message, args) {
    var killtext = ['is now dead', 'has died', 'was killed', `was killed by ${message.author}`]
    message.channel.send(`${args.join(' ')} ${killtext[Math.floor(Math.random() * killtext.length)]}.`)
  }
}