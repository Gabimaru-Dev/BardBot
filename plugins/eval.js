module.exports = {
  command: 'eval',
  description: 'Evaluate JavaScript code (owner only)',
  pattern: [/^\.eval (.+)$/s, /^\/eval (.+)$/s],
  handler: async (bot, msg, match) => {
    const ownerIds = ['8095961856', '7638524824']; // Add your Telegram user IDs as strings

    if (!ownerIds.includes(msg.from.id.toString())) {
      return bot.sendMessage(msg.chat.id, '❌ You are not authorized to use this command.');
    }

    try {
      let result = eval(match[1]);
      if (typeof result !== 'string') result = require('util').inspect(result);
      bot.sendMessage(msg.chat.id, `✅ *Result:*\n\`\`\`\n${result}\n\`\`\``, {
        parse_mode: 'Markdown'
      });
    } catch (e) {
      bot.sendMessage(msg.chat.id, `❌ *Error:*\n\`\`\`\n${e.message}\n\`\`\``, {
        parse_mode: 'Markdown'
      });
    }
  }
};