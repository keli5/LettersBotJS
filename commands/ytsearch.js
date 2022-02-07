const searchYoutube = require('youtube-api-v3-search');
module.exports = {
  name: 'ytsearch',
  aliases: ['yt', 'youtube'],
  description: 'Search YouTube for a video.',
  usage: '<query>',
  args: true,
  cooldown: 10,
  async execute (client, message, args) {
    let ytapikey = 'AIzaSyAWIlu2Fu5umX3TjbjRydkWqbiQwyV5ErE'
    var result = await searchYoutube(ytapikey, {
      q: args.join(' '),
      part: 'snippet',
      type: 'video'
    })
    if (result.items[0]) {
      result = result.items[0].id.videoId
    } else {
      result = undefined
    }
    if (!result) return message.channel.send('No results found for \`' + args.join(' ').trunc(65, true) + '\`')
    message.channel.send("https://www.youtube.com/watch?v=" + result)
  }
}