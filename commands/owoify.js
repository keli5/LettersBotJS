var faces = ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^"];
module.exports = {
  name: 'owoify',
  description: 'OwOify some text uwu',
  aliases: ['uwuify', 'owo', 'uwu'],
  usage: '<text>',
  args: true,
  async execute (client, message, args) {
    var embed = new client.discord.MessageEmbed();
    embed.setColor(client.embedcolors.default);
    embed.setTitle('uwu');
    embed.setDescription(args.join(' ').replace(/(?:r|l)/g, "w").replace(/(?:R|L)/g, "W").replace(/n([aeiou])/g, 'ny$1').replace(/N([aeiou])/g, 'Ny$1').replace(/N([AEIOU])/g, 'Ny$1').replace(/ove/g, "uv").replace(/\!+/g, " " + faces[Math.floor(Math.random() * faces.length)] + " "));
    message.channel.send(embed)
  }
}