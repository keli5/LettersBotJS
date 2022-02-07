module.exports = {
  name: 'guilds',
  description: 'Check bot guilds',
  args: false,
  hidden: true,
  permissions: "BOT_OWNER",
  async execute (client, message, args) {
    var gds = [];
Array.from(client.guilds.cache).forEach(function(e) {
  gds.push(e[1].name + ", owned by " + e[1].owner.user.tag);
})
message.channel.send(gds.join('\n'))

  }
}