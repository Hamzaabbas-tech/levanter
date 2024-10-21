const { bot } = require('../lib/')

bot(
  {
    pattern: 'afk ?(.*)',
    desc: 'away from keyboard',
    type: 'misc',
  },
  async (message, match, ctx) => {
    if (!ctx.isAfk && !match)
      return await message.send(
        '> Example :\n- My owner is AFK last seen before #lastseen\n- When send a message, automatically set status to not AFK.\n- afk off'
      )
    if (!ctx.isAfk) {
      if (match) ctx.reason = match
      ctx.isAfk = true
      ctx.lastseen = Math.round(new Date().getTime() / 1000)
      ctx.p = message.participant
      return await message.send(
        match.replace('#lastseen', Math.round(new Date().getTime() / 1000) - ctx.lastseen)
      )
    }
    if (match === 'off') {
      await message.send('Your not afk anymore.', { quoted: message.data }, 'text', ctx.p)
      ctx.isAfk = false
      ctx.reason = false
      ctx.lastseen = 0
      ctx.p = ''
    }
  }
)
