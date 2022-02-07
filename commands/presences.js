module.exports = {
  name: 'presences',
  description: 'Views presence and activity info for yourself or someone you mention.',
  usage: '[mention]',
  aliases: ['activities', 'activity', 'presence'],
  cooldown: 2,
  hidden: false,
  async execute (client, message, args) {
    let st = new Map();
    st.set('online', 'online');
    st.set('idle', 'idle');
    st.set('dnd', 'in Do Not Disturb');
    let em = new client.discord.MessageEmbed();
    em.setColor(client.embedcolors.success)
    let v;
    try {
    if (args.length) {
      tryi = message.guild.members.cache.find(member => member.displayName.toLowerCase().includes(args.join(' ').toLowerCase()))
      if (!tryi) {v = message.mentions.users.first()} else {v = tryi.user}
    } else {
      v = message.author;
    }
    em.setTitle('Presence/activity info for ' + v.tag);
    let c = v.presence.clientStatus;
    if (!c || !(c.web || c.desktop || c.mobile)){
      em.setColor(client.embedcolors.error)
      em.addField('Offline', 'This user is offline.');
    } else {
      if (c.web) {
        em.addField('Web app', 'This user is ' + st.get(c.web) + ' on the web app.', true)
      }
      if (c.mobile) {
        em.addField('Mobile app', 'This user is ' + st.get(c.mobile) + ' on the mobile app.', true)
      }
      if (c.desktop) {
        em.addField('Desktop app', 'This user is ' + st.get(c.desktop) + ' on the desktop app.', true)
      }
    }
    let sprs, prs, cprs, vsprs, oprs;
    prs = v.presence.activities;
    if (!prs) return message.channel.send(em);
    prs.forEach(e => {
      if (e.name == 'Spotify') {sprs = e;}
      else if (e.name == 'Custom Status'){ cprs = e;}
      else if (e.name == 'Visual Studio Code') {vsprs = e;}
      else { oprs = e; }
    })
    em.addBlankField();
    if (sprs) {
     let authors = sprs.state.split(';')
     if (authors.length > 1) {
       if (authors.length > 2) {
         authors = `${authors.shift()}, ${authors.shift()}, and ${authors.length} more`
       } else {
         authors = authors.join(', ')
       }
       } else {
         authors = sprs.state
       }
      em.addField('Spotify', 'Listening to ' + sprs.details + ', by ' + authors + ' on album ' + sprs.assets.largeText)
    }
    if (cprs) {
      em.addField('Custom status', (cprs.emoji ? cprs.emoji.name : '') + " " + cprs.state, true);
    }
    if (vsprs) {
      em.addField('Visual Studio Code', vsprs.details + ' on workspace ' + vsprs.state.split('Workspace: ')[1], true)
    }
    if (oprs) {
      newtype = oprs.type.toLowerCase().split('')
      newtype[0] = newtype[0].toUpperCase();
      newtype = newtype.join('');
      em.addField(newtype + ' ' + oprs.name, (oprs.details ? 'Details: ' + oprs.details : 'No details') + '\n' + (oprs.state ? 'State: ' + oprs.state : 'No state'), true)
    }
    message.channel.send(em);
    } catch (e) {
      message.reply('something went wrong. Check that you spelled the name correctly, or mentioned someone in this guild. If you did both of these, something else may be broken at the moment.')
    }
  }
}