module.exports = {
  command: 'remind',
  description: 'Set a reminder. Example: .remind 5m Take a break',
  pattern: /^(\.|\/)remind\s+(\d+)([smh])\s+(.+)/i,
  handler: async (bot, msg, match) => {
    const amount = parseInt(match[2]);
    const unit = match[3];
    const task = match[4];

    const unitMs = {
      s: 1000,
      m: 60_000,
      h: 3_600_000,
    };

    if (!unitMs[unit]) {
      return bot.sendMessage(msg.chat.id, '❌ Invalid time unit. Use s, m, or h.');
    }

    const delay = amount * unitMs[unit];

    await bot.sendMessage(
      msg.chat.id,
      `⏳ Reminder set for ${amount}${unit}. I'll remind you to:\n\n"${task}"`
    );

    setTimeout(() => {
      bot.sendMessage(
        msg.chat.id,
        `🔔 Reminder: ${msg.from.first_name}, don't forget to:\n\n"${task}"`
      );
    }, delay);
  },
};