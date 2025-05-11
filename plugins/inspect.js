module.exports = {
  command: 'inspect',
  description: 'Inspect and stringify a JSON object',
  pattern: /^\.inspect (.+)$/i,
  handler: async (bot, msg, match) => {
    const input = match[1];
    try {
      const parsed = JSON.parse(input);
      await bot.sendMessage(msg.chat.id, `Inspecting object:\n\`\`\`${JSON.stringify(parsed, null, 2)}\`\`\``);
    } catch (err) {
      await bot.sendMessage(msg.chat.id, `Invalid JSON: ${err.message}`);
    }
  }
};