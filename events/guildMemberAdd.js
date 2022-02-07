module.exports = async (client, member) => {
  client.updateMemCount();
  guild = member.guild;
  if (guild.id == '671897656003395595') member.roles.add('671902405364809738')
}