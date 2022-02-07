module.exports = {
  name: 'npm',
  description: 'Find a package on NPM.',
  usage: '<package name>',
  args: true,
  async execute (client, message, args) {
    message.channel.send(`https://www.npmjs.com/package/${args.join('_')}`)
  }
}