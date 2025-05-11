const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// === CONFIG ===
const token = '7508572561:AAEqTsTjzZAgt3EUR3K2yBCdxlrL6lZheds'; // Replace with your real token
const ownerIds = ['8095961856', '7638524824']; // Add your owner IDs here

const bot = new TelegramBot(token, { polling: true });

// === PLUGIN LOADING ===
const plugins = [];
const pluginFiles = fs.readdirSync(path.join(__dirname, 'plugins')).filter(file => file.endsWith('.js'));

for (const file of pluginFiles) {
  const plugin = require(`./plugins/${file}`);
  if (plugin && plugin.handler && plugin.pattern) {
    plugins.push(plugin);
  }
}

// === START / HELP ===
bot.onText(/^(\.|\/)(start|help)$/i, (msg) => {
  const helpList = plugins
    .filter(p => p.command && p.description)
    .map(p => `• *${p.command}* — ${p.description}`)
    .join('\n');

  const text = `🤖 *Welcome!*\n\nHere are my available commands:\n\n${helpList}`;
  bot.sendMessage(msg.chat.id, text, { parse_mode: 'Markdown' });
});

// === MESSAGE HANDLER ===
bot.on('message', async (msg) => {
  if (!msg.text) return;
  const text = msg.text.trim();

  for (const plugin of plugins) {
    const patterns = Array.isArray(plugin.pattern) ? plugin.pattern : [plugin.pattern];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        try {
          await plugin.handler(bot, msg, match);
        } catch (err) {
          console.error(`Error in plugin ${plugin.command}:`, err);
          bot.sendMessage(msg.chat.id, `⚠️ Error in *${plugin.command}*`, { parse_mode: 'Markdown' });
        }
        return;
      }
    }
  }
});