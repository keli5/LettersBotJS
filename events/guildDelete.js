module.exports = async (client, guild) => {
  console.log(`Bot left/removed from guild ${guild.name} (id ${guild.id}) at ${client.moment().format('LL, LTS')}`);
  if (client.config.blacklistedGuilds.includes(guild.id)) {
    guild.owner.user.send(`Your guild (${guild.name}) is blacklisted, and the bot has been removed. DM ${client.users.get(client.config.botOwner)} to see about getting it removed from the blacklist.`)
    console.log('Guild ' + guild.name + ' blacklisted - leaving.');
  }
  client.updateMemCount();
}