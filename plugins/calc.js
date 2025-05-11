const { evaluate } = require('mathjs');

module.exports = {
  command: 'calc',
  pattern: [/^(\.|\!)calc\s+(.+)/i, /^\/calc\s+(.+)/i],
  handler: async (bot, msg) => {
    const text = msg.text.trim();
    const expression = text.split(/\s+/).slice(1).join(' ');

    try {
      const result = evaluate(expression);
      await bot.sendMessage(msg.chat.id, `🧮 *Result:*\n\`${expression} = ${result}\``, {
        parse_mode: 'Markdown'
      });
    } catch (err) {
      await bot.sendMessage(msg.chat.id, '⚠️ Invalid expression. Please try again.');
    }
  }
};