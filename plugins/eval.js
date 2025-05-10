module.exports = {
  command: 'eval',
  description: 'Evaluate JavaScript code',
  pattern: /^\.eval (.+)$/i,
  handler: async (bot, msg, match) => {
    const code = match[1];
    try {
      const result = eval(code);  // Be cautious with eval in production!
      await bot.sendMessage(msg.chat.id, `Result: ${result}`);
    } catch (err) {
      await bot.sendMessage(msg.chat.id, `Error: ${err.message}`);
    }
  }
};