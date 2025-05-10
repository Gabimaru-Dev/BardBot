const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const token = process.env.BOT_TOKEN || '7508572561:AAEqTsTjzZAgt3EUR3K2yBCdxlrL6lZheds';
const bot = new TelegramBot(token, { polling: true });

console.log('Hark! The BardBot hath awaken! 🧎‍➡️');

// Load all plugins from the plugins directory
const plugins = [];
const pluginFolder = path.join(__dirname, 'plugins');

fs.readdirSync(pluginFolder).forEach(file => {
  if (file.endsWith('.js')) {
    const plugin = require(path.join(pluginFolder, file));
    plugins.push(plugin);
    if (plugin.command) {
      console.log(`Plugin loaded: ${plugin.command}`);
    }
  }
});

// Listen for all text messages and pass them to plugins
bot.on('message', msg => {
  for (const plugin of plugins) {
    if (plugin.command && plugin.pattern.test(msg.text)) {
      plugin.handler(bot, msg, msg.text.match(plugin.pattern));
    }
  }
});