const p = require('pluralize');
Array.prototype.shuffle = function shuffle() {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
}
String.prototype.trunc =
     function( n, useWordBoundary ){
         if (this.length <= n) { return this; }
         var subString = this.substr(0, n-1);
         return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString) + "...";
      };
const discord = require('discord.js');
const client = new discord.Client({disableEveryone: true});
const fast = require('fast.js');
const moment = require('moment');
const fs = require('fs');
const Keyv = require('keyv');
const Jimp = require('jimp');
const KeyvFile = require('keyv-file');
const Markov = require('markov-strings').default
client.makeid = function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
client.userFromMention = function userFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.get(mention);
	}
}

const achievements = [
    {"messages": 200, "name": "Talkative"},
    {"messages": 750, "name": "Chatterbox"},
    {"messages": 1500, "name": "Hyperactive"},
    {"messages": 3750, "name": "Psychotic"}
  ]
exports.client = client;
client.updateMemCount = function() {
  let amount = client.guilds.cache.reduce((a, b) => {
    return a + b.memberCount
  }, 0)
  client.user.setActivity(amount + ' people | '+ client.config.prefix + 'invite', { type: 'WATCHING' })
}
console.log('Initial vars set')
client.fast = fast;
client.vcs = [];
client.Jimp = Jimp;
client.fs = fs;
client.tempdata = [];
client.mkvdata = JSON.parse(fs.readFileSync('./corpus.json', {encoding: 'utf-8'}))
client.updateMarkovData = function(data) {
    data.forEach(e => {
      client.mkvdata.push({string: e.string, author: e.author});
    });
    fs.writeFileSync("corpus.json", '[' + JSON.stringify(client.mkvdata) + ']');
    client.mkvdata = JSON.parse(fs.readFileSync('./corpus.json', {encoding: 'utf-8'}))
    data = [];
}
client.newmarkov = new Markov(client.mkvdata, {stateSize: 2})
client.newmarkov.buildCorpus()
client.moment = moment;
client.cooldowns = new discord.Collection();
client.commands = new discord.Collection();
client.events = new discord.Collection();
client.discord = discord;
client.p = p;
client.embedcolors = {
  "default": [11, 11, 200],
  "error": [200, 11, 11],
  "success": [11, 200, 11],
  "congrats": [200, 200, 11]
}
types = ['Array', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Object']
types.forEach(
    function(name) {
        client['is' + name] = function(obj) {
              return toString.call(obj) == '[object ' + name + ']';
    };
});
console.log('Client properties passed')
var config;
client.loadConfig = function loadConfig() {
  delete require.cache[require.resolve('./config.json')];
  config = require('./config.json');
  client.config = config;
  client.mkvdata = JSON.parse(fs.readFileSync('./corpus.json', {encoding: 'utf-8'}))
}
client.loadEvents = function loadEvents () {
  fs.readdirSync('./events/').forEach(event => {
    delete require.cache[require.resolve(`./events/${event}`)];

    const eventName = event.split('.')[0] ;
    const eventFile = require(`./events/${event}`);

    client.events.set(eventName, eventFile);

    client.on(eventName, eventFile.bind(null, client));
  });
  console.log(`Successfully loaded ${fs.readdirSync('./events/').length} events.`);
};
client.loadCommands = function loadCommands () {
  fs.readdirSync('./commands/').forEach(command => {
    delete require.cache[require.resolve(`./commands/${command}`)];

    const commandName = command.split('.')[0];
    const commandFile = require(`./commands/${command}`);

    client.commands.set(commandName, commandFile);
  });
  console.log(`Successfully loaded ${fs.readdirSync('./commands/').length} commands.`);
};
console.log('Loading functions set & passed')
client.loadConfig();
client.loadEvents();
client.loadCommands();

client.login(config.token);
console.log('Logging into Discord')