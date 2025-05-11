const ms = require('ms');

module.exports = {
  command: 'remind',
  description: 'Set a reminder. Usage: .remind 10m Do something',
  pattern: [/^\.remind\s+(.+)/i, /^\/remind\s+(.+)/i],
  handler: async (bot, msg) => {
    const match = msg.text.match(/^(\.|\/)remind\s+(\d+[smhd])\s+(.+)/i);
    if (!match) {
      return bot.sendMessage(msg.chat.id, '❗ Usage: .remind <time> <message>\nExample: .remind 10m Take a break');
    }

    const [, , timeStr, reminderMsg] = match;
    const duration = ms(timeStr);

    if (!duration || duration < 1000 || duration > 7 * 24 * 60 * 60 * 1000) {
      return bot.sendMessage(msg.chat.id, '❗ Please use a valid time like 10s, 5m, 1h. Max: 7d');
    }

    bot.sendMessage(msg.chat.id, `⏳ Reminder set for ${timeStr} from now! I’ll remind you.`);

    setTimeout(() => {
      bot.sendMessage(msg.chat.id, `🔔 Reminder: ${reminderMsg}`, {
        reply_to_message_id: msg.message_id,
      });
    }, duration);
  }
};