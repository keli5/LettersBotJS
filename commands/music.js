let api = require('genius-api');
let genius = new api('XxYwUFz-fLfYM0BJhbtsh9HPeCIU7ciKYbHVEXe8anFcXk5eDERs7HhYScOJjzEs');

module.exports = {
  name: 'music',
  aliases: ['song'],
  description: 'Get info for a song.',
  usage: '<song name>',
  args: true,
  cooldown: 5,
  hidden: true,
  async execute (client, message, args) {
    var em = new client.discord.MessageEmbed();
    try {
    genius.search(args.join(' ')).then(res => {
      let rs;
      if (!res.hits[0]) {
        em.setColor(client.embedcolors.error)
        em.setTitle('No results found.')
        em.setDescription('No result found for `' + args.join(' ').trunc(60, true) + '`.')
        return message.channel.send(em)
      } else {
        rs = res.hits[0].result
      }
      console.log(rs)
      em.setColor(client.embedcolors.success)
      em.setTitle(rs.primary_artist.name + " - " + rs.title);
      em.setURL("https://genius.com"+rs.path);
      em.setThumbnail(rs.song_art_image_thumbnail_url)
      em.addField('Title', rs.title, true)
      em.addField('Artist', rs.primary_artist.name, true)
      em.addField('Song ID', rs.id, true)
      em.addField('Annotation count', rs.annotation_count, true)
      em.addField('Page views', rs.stats.pageviews.toLocaleString(), true)
      message.channel.send(em)
    })
  } catch (e) {
    em.setColor(client.embedcolors.error)
    em.setTitle('No results found.')
    em.setDescription('No result found for `' + args.join(' ').trunc(60, true) + '`.')
  message.channel.send(em)
  }
  }
}