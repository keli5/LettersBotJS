module.exports = {
  name: 'rebuildcorpus',
  description: '',
  usage: '',
  args: false,
  cooldown: 2,
  hidden: true,
  permissions: "BOT_OWNER",
  async execute (client, message, args) {
    await message.reply('rebuilding corpus...')
    client.newmarkov.buildCorpusAsync().then(()=>{
      message.reply('done rebuilding corpus.')
    });
  }
}