const fs = require('fs');
const path = require('path');

module.exports = {
  command: 'start',
  pattern: /^\.start$/i,
  handler: async (bot, msg) => {
    const pluginFolder = path.join(__dirname);
    const files = fs.readdirSync(pluginFolder).filter(f => f.endsWith('.js') && f !== 'start.js');

    let menu = '*🤖 Command Menu*\n\n';

    for (const file of files) {
      const plugin = require(path.join(pluginFolder, file));
      if (plugin.command && plugin.description) {
        menu += `• \`.${plugin.command}\` — ${plugin.description}\n`;
      }
    }

    menu += `\n_Use commands by sending them like: .command_`;
    bot.sendMessage(msg.chat.id, menu, { parse_mode: 'Markdown' });
  }
};