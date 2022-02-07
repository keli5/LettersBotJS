module.exports = {
  name: 'spotify',
  description: 'Show spotify info for a user. It\'s based on presences, so it won\'t work without Spotify being connected.',
  usage: '[mention]',
  cooldown: 5,
  hidden: false,
  async execute (client, message, args) {
    var victim = message.mentions.users.first() || message.author;
    var em = new client.discord.MessageEmbed();
    var sprs, prs;
    prs = victim.presence.activities;
    prs.forEach(e => {
      if (e.name == 'Spotify') sprs = e;
    })
    if (!sprs) {
      em
        .setColor(client.embedcolors.error)
        .setTitle('Error')
        .setDescription(victim.tag + ' is not listening to Spotify.')
    } else {
      var authors = sprs.state.split(';')
      var s;
      if (authors.length > 1) {
        s = 's'
        authors = authors.join('\n')
      } else {
        s = ''
        authors = sprs.state
      }
      em
        .setColor(client.embedcolors.success)
        .setTitle('Spotify for ' + victim.tag)
        .addField('Title', sprs.details, true)
        .addField('Author' + s, authors, true)
        .addField('Album', sprs.assets.largeText)
        .setImage(sprs.assets.largeImageURL({
          format: 'jpg'
        }));
    }
    message.channel.send(em)
  }
}