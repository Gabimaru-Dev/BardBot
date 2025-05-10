const { DateTime } = require('luxon');

module.exports = {
  command: 'time',
  description: 'Get current time in any timezone',
  pattern: /\.time(?:\s+([\w\/_-]+))?/i,
  handler: async (bot, msg, match) => {
    const zone = match[1] || 'UTC';
    try {
      const now = DateTime.now().setZone(zone);
      if (!now.isValid) throw new Error();
      const formatted = now.toFormat("cccc, dd LLL yyyy • HH:mm:ss ZZZZ");
      bot.sendMessage(msg.chat.id, `Time in *${zone}*:\n${formatted}`, { parse_mode: 'Markdown' });
    } catch {
      bot.sendMessage(msg.chat.id, `❌ Invalid timezone.\nTry \`.time Africa/Lagos\` or check: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones`);
    }
  }
};