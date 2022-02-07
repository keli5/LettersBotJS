module.exports = {
  name: 'eval',
  description: 'Evaluates some code',
  usage: '<code>',
  args: true,
  cooldown: 2,
  hidden: true,
  permissions: "BOT_OWNER",
  async execute (client, message, args) {
      var success = ['Hell yeah!', 'Result', 'Success!', 'Done!', 'That worked??', '😃', 'There.', 'epic gamer moment']
      var failure = ['damnit.', 'Result', 'Failed.', 'Whoops!', 'Oh shit.', '😢', 'Aw..', 'this is not epic']
      let e = new client.discord.MessageEmbed();
      try {
        e.setTitle(success[Math.floor(Math.random() * success.length)]);
        e.setDescription(`\`\`\`js\n${await eval(`(async()=>{${args.join(' ')}})()`)}\n\`\`\``);
        e.setColor(client.embedcolors.success);
      } catch (err) {
        e.setTitle(failure[Math.floor(Math.random() * failure.length)]);
        e.setDescription(`\`\`\`js\n${err}\`\`\``);
        e.setColor(client.embedcolors.error);
      }
      message.channel.send(e);

  }
};