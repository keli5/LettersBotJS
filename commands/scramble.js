module.exports = {
  name: 'scramble',
  description: 'Scramble some text.',
  usage: '<text>',
  args: true,
  async execute (client, message, args) {
    message.channel.send(args.shuffle().join(' '));
  }
}