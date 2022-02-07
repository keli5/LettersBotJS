module.exports = async (client, message) => {
   guild = message.guild
  if (message.author.bot) return;

if (client.config.allowedLearningServers.includes(message.guild.id) && message.content.length >= 7 && !message.channel.nsfw && !/^(lb-|\?|\||\>|\!|\:\:|d\:\:|b\:)/gm.test(message.content) && !message.author.bot) {
    newentry = {string: message.content, author: message.author.id}
    if (message.attachments.first()) {
      newentry.attachment = message.attachments.first().url
      client.tempdata.push(newentry);
      return;
    }
    client.tempdata.push(newentry)
}
  

  const prefix = client.config.prefix;

  if (((Math.random() * 1000) <= 5) || message.mentions.users.has(client.user.id)) {
    client.newmarkov.generateAsync({
      maxTries: 200,
      filter: result => result.score > 10
    }).then(res => {
      message.channel.send(res.string)
    })
  }
  
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (message.channel.type !== 'text') return message.reply('Commands cannot be run inside DMs.');
  if (command.permissions) {
  if (command.permissions.toUpperCase() == 'BOT_OWNER' && client.config.botOwner != message.author.id) {
   const permsError = await message.channel.send(new client.discord.MessageEmbed()
     .setColor(client.embedcolors.error)
     .setTitle(`Wrong permissions for ${commandName}.`)
     .addField('Required permissions for this command:', 'Bot owner only')
   )
   return;
   } else
   if (Object.keys(client.discord.Permissions.FLAGS).includes(command.permissions.toUpperCase()) && !message.member.hasPermission(command.permissions)) {
    const permsError = await message.channel.send(new client.discord.MessageEmbed()
     .setColor(client.embedcolors.error)
     .setTitle(`Wrong permissions for ${commandName}.`)
     .addField('Required permissions for this command:', client.isArray(command.permissions) ? command.permissions.join(', ') : command.permissions.toLowerCase().split('_').join(' '))
   )
   return;
   }
}
  if (command.args && !args.length) {
    const usageError = await message.channel.send(new client.discord.MessageEmbed()
      .setColor(client.embedcolors.error)
      .setTitle(`Improper usage of ${commandName}.`)
      .setDescription(command.description)
      .addField('Proper usage:', `${prefix}${commandName} ${command.usage}`)
    )
    return;
  };

  if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new client.discord.Collection());

  if (!client.config.botOwners.includes(message.author.id)) {
    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`Please wait ${client.p('second', timeLeft.toFixed(1), true)} before reusing ${command.name}.`);
      }
    }

    timestamps.set(message.author.id, now);

    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
    console.log(`- ${client.moment().format('LL, LTS')} `)
    console.log(`- ${message.author.tag} in ${guild.name}/${message.channel.name}: `)
    console.log(`- ran command ${command.name} with ${args.length > 0 ? `args [${args.join(', ')}]` : 'no args'} `)
    console.log('  ')
    command.execute(client, message, args)
  } catch (error) {
    console.error(error);
    message.reply('An error has occurred running that command.');
  }
 };
