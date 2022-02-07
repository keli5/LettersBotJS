module.exports = {
  name: 'help',
  description: 'Get a list of commands or help with a specific command.',
  usage: '[command]',
  args: false,
  cooldown: 2,
  category: "generic",
  async execute (client, message, args) {
    let em = new client.discord.MessageEmbed();
    const { commands } = client;
    const cmdmap = client.commands.filter(x => !x.hidden).map(x => x.name)
    const prefix = client.config.prefix;
    if (!args.length) {
      em.setColor(client.embedcolors.default);
	    em.setTitle('Commands');
      em.setDescription(cmdmap.join(", "));
      em.setFooter(`You can do ${prefix}help [command name] to get info on a specific command. Huge thanks to Litleck and william. ${cmdmap.length} commands.`);

      return message.channel.send(em);
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command || command.hidden) {
      em.setColor(client.embedcolors.error);
      em.setTitle('That\'s not a valid command.');
	    return message.channel.send(em);
    }
    em.setColor(client.embedcolors.default);
    let m = command.name.split('')
    m[0] = m[0].toUpperCase();
    m = m.join("");
    em.setTitle(m);

    if (command.aliases) em.addField('Aliases:', command.aliases.join(', '));
    if (command.description) em.addField('Description:', command.description);
    if (command.permissions) em.addField('Required permissions:', client.isArray(command.permissions) ? command.permissions.join(', ') : command.permissions.toLowerCase().split('_').join(' '))
    if (command.usage) em.addField('Usage:', `${prefix}${command.name} ${command.usage}`);

    em.addField('Cooldown:', client.p('second', command.cooldown || 3, true));

    message.channel.send(em);
  }
};