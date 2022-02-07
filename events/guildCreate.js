module.exports = async (client, guild) => {
  console.log(`Bot joined guild ${guild.name} (id ${guild.id}) at ${client.moment().format('LL, LTS')}`);
  if (client.config.blacklistedGuilds.includes(guild.id)) {
    guild.leave();
  }
  client.updateMemCount();
}