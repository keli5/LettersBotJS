module.exports = {
  name: 'xok-traitors',
  description: 'Check xok traitors',
  usage: '',
  args: false,
  hidden: true,
  async execute (client, message, args) {
  if (message.guild.id == "554079640499519499") {
    if (!message.member.hasPermission('MANAGE_CHANNELS') && message.author.id != client.config.botOwner) return;
    fs = require('fs');
    rgx = /xok/i
    husks = [];
    Array.from(message.guild.members.cache).forEach(function(e) {
      n = e[1].displayName
        if (!rgx.test(n)) {
          husks.push(e[1].user.tag + (e[1].nickname ? `, ${e[1].nickname}\n` : "\n"))
        }
    })
    fs.writeFileSync("xok-traitors.txt", husks.join('\n'))
    await message.channel.send('Keep in mind that this file may have a lot of false positives - such as non-latin characters, split xoks ("x-o-k, X O K"), emojis, etc..', {files: ["xok-traitors.txt"]})
    fs.unlinkSync("xok-traitors.txt")
  }
 }
}