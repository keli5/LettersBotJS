module.exports = {
  name: 'botinfo',
  description: 'Check info about the bot.',
  usage: '',
  async execute (client, message, args) {
    let os = require('os');
    let c = os.cpus()
    let { execSync } = require('child_process')
    let nodever = execSync('node -v')
    let em = new client.discord.MessageEmbed();
    let uptime = client.moment.utc(client.uptime).format('HH:mm:ss')
    let commandCount = client.fs.readdirSync('./commands/').length
    let eventCount = client.fs.readdirSync('./events/').length
    let ping = client.ws.ping;
    em.setTitle('Bot metrics')
    em.setDescription('This command shows system and bot metrics.')
    em.addField('Uptime', uptime, true);
    em.addField('WebSocket ping', ping + ' ms', true);
    em.addField('Last reload latency', client.lastReloadTime || "N/A" + ' ms', true);
    em.addField('Running as user', process.env.USER, true);
    em.addField('Command count', commandCount, true);
    em.addField('Event count', eventCount, true);
    em.addField('Node.JS version', nodever, true);
    em.addField('Running on', os.arch()+' '+os.type()+'/'+os.release(), true);
    em.addField('CPU type', '**' +c.length + 'x** '+ c[0].model, true);
    em.addField('Clock speed', (c[0].speed / 1000).toFixed(2) + ' GHz', true);
    em.addField('Free memory', (os.freemem()/125000).toFixed(1) + ' MiB', true)

    message.channel.send(em)
  }
}