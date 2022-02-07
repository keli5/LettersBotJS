module.exports = async (client) => {
  client.user.setActivity('Just restarted!')
  console.log('Bot connected to Discord');
  Array.from(client.guilds.cache).forEach(function(e) {
    console.log(e[1].name + ", owned by " + e[1].owner.user.tag)
    e[1].queue = []
  })
  setTimeout(client.updateMemCount, 60000)
  setInterval(client.updateMemCount, 3600000)
}