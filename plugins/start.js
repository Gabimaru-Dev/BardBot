const fs = require('fs');
const path = require('path');

module.exports = {
  command: 'start',
  description: 'Show help for all commands',
  pattern: [/^\.start$/, /^\/start$/],
  handler: async (bot, msg) => {
    const pluginFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && file !== 'start.js');

    let helpText = '🤖 *Available Commands:*\n\n';

    for (const file of pluginFiles) {
      const plugin = require(path.join(__dirname, file));
      if (plugin.command && plugin.description) {
        helpText += `• \`.${plugin.command}\` / \`/${plugin.command}\` — ${plugin.description}\n`;
      }
    }

    helpText += `\n_Use dot (.) or slash (/) before each command._`;

    await bot.sendMessage(msg.chat.id, helpText, { parse_mode: 'Markdown' });
  }
};