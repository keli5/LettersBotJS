module.exports = {
  name: 'scale',
  description: 'Scale an image by a factor of <n>.',
  usage: '<n> <attachment | [link]>',
  args: true,
  async execute (client, message, args) {
    
    if (message.attachments.first()) {
      att = message.attachments.first().url
    } else {
      att = args[1] || "https://moodle.htwchur.ch/pluginfile.php/124614/mod_page/content/4/example.jpg"
    }
    var working = await message.channel.send('Scaling `' + att + "` by a factor of " + Number(args[0]).toFixed(1))
    message.channel.startTyping();
    client.Jimp.read(att).then(async (image) => {
      image.scale(Number(Number(args[0]).toFixed(1)), client.Jimp.RESIZE_BEZIER);
      imgbuffer = await image.getBufferAsync("image/png")
      working.delete();
      message.reply("Done", {files: [imgbuffer]})
    }).catch(error => {
      message.channel.send(":warning: failed");
      console.error(error)
    })
    message.channel.stopTyping();
  }
}