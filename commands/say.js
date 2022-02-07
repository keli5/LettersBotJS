module.exports = {
  name: 'say',
  description: 'Repeat some text',
  usage: 'text',
  args: true,
  hidden: true,
  permissions: "BOT_OWNER",
  async execute (client, message, args) {
    await message.delete();
    return message.channel.send(args.join(' '))
  }
}