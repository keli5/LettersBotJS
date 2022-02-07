module.exports = {
  name: 'wikipedia',
  aliases: ['wiki'],
  description: 'Find a Wikipedia article.',
  usage: '<article name>',
  args: true,
  async execute (client, message, args) {
    message.channel.send(`https://en.wikipedia.org/wiki/${args.join('_')}`)
  }
}