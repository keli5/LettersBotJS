module.exports = {
  name: 'invite',
  description: 'Invite LettersBot to your server.',
  usage: '',
  args: false,
  async execute (client, message, args) {
    try {
    message.author.send(`Thanks for (maybe?) deciding to add LettersBot to your server! Here's the link to add it:
\nhttps://discordapp.com/oauth2/authorize?client_id=659957372990783488&scope=bot&permissions=8
And if you want to join the support/info server, the invite link is: https://discord.gg/rXVnuTB
Happy botting!`);
    message.reply(' 📬 Check your DMs!')
    } catch (e) {
    message.reply('could not DM you.')
    }
  }
}