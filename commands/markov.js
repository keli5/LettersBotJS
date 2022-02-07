module.exports = {
  name: 'markov',
  description: 'Generate a Markov chain.',
  cooldown: 8,
  async execute (client, message, args) {
  try {
    client.newmarkov.generateAsync({
      maxTries: 200,
      filter: result => result.score > 10
    }).then(res => {
      message.channel.send(res.string)
      if (args[0] == 'debug' && client.config.botOwner == message.author.id) message.channel.send(JSON.stringify(res, null, 2))
    })
  } catch (e) {
    message.channel.send('Failed. Try again. If it still fails, the corpus may need to be rebuilt.')
  }
  }
}