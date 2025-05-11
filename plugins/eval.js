module.exports = {
  command: 'eval',
  pattern: /^(\.|\!)eval (.+)/i,
  handler: async (bot, msg, match) => {
    const chatId = msg.chat.id;

    try {
      const code = msg.text.split(/ (.+)/)[1]; // safer extraction
      let result = await eval(code);
      if (typeof result !== 'string') result = require('util').inspect(result);

      bot.sendMessage(chatId, `✅ Result:\n\`\`\`\n${result}\n\`\`\``, {
        parse_mode: 'Markdown'
      });
    } catch (err) {
      bot.sendMessage(chatId, `❌ Error:\n\`\`\`\n${err.message}\n\`\`\``, {
        parse_mode: 'Markdown'
      });
    }
  }
};