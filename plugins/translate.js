const translate = require('@vitalets/google-translate-api');

module.exports = {
  command: 'translate',
  description: 'Translate text to a target language. Usage: .tr en Hello',
  pattern: [/^\.tr\s+\w+\s+.+/i, /^\/tr\s+\w+\s+.+/i],
  handler: async (bot, msg) => {
    const args = msg.text.split(/\s+/);
    if (args.length < 3) {
      return bot.sendMessage(msg.chat.id, '❗ Usage: .tr <lang_code> <text>\nExample: .tr fr Hello');
    }

    const lang = args[1];
    const text = args.slice(2).join(' ');

    try {
      const res = await translate(text, { to: lang });
      bot.sendMessage(msg.chat.id, `**Translated (${lang})**:\n${res.text}`, { parse_mode: 'Markdown' });
    } catch (err) {
      console.error(err);
      bot.sendMessage(msg.chat.id, '❌ Failed to translate. Make sure the language code is valid.');
    }
  }
};