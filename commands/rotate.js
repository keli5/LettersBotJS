module.exports = {
  name: 'rotate',
  description: 'Rotate an image <deg> degrees. Transparency only works with formats that support it.',
  usage: '<deg> <attachment | [link]>',
  args: true,
  async execute (client, message, args) {
    if (message.attachments.first()) {
      att = message.attachments.first().url
    } else {
      att = args[1] || "https://moodle.htwchur.ch/pluginfile.php/124614/mod_page/content/4/example.jpg"
    }
    var working = await message.channel.send('Rotating `' + att + "` " + Number(args[0]).toFixed(1) + " degrees")
    message.channel.startTyping();
    client.Jimp.read(att).then(async (image) => {
      image.rotate(Number(Number(args[0]).toFixed(1)));
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