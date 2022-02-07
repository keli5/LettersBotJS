const { execSync } = require('child_process')
module.exports = {
  name: 'exec',
  description: 'Run a command in Bash.',
  usage: '<command>',
  args: true,
  cooldown: 2,
  hidden: true,
  permissions: "BOT_OWNER",
  async execute (client, message, args) {
      let e = new client.discord.MessageEmbed();
      e.setTitle('Result');
      try {
        e.setDescription(`\`\`\`js\n${execSync(args.join(' '))}\`\`\``);
        e.setColor(client.embedcolors.success);
      } catch (err) {
        e.setDescription(`\`\`\`js\n${err}\`\`\``);
        e.setColor(client.embedcolors.error);
      }
      message.channel.send(e);
  }
};