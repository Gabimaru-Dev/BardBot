const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const express = require('express');

const token = '7508572561:AAEqTsTjzZAgt3EUR3K2yBCdxlrL6lZheds'; // Replace with your actual token
const bot = new TelegramBot(token, { polling: true });

// Set up Express to keep the bot alive on Render (with a port for deployment)
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Load all command plugins from plugins folder
const plugins = [];
const pluginFiles = fs.readdirSync(path.join(__dirname, 'plugins')).filter(file => file.endsWith('.js'));

for (const file of pluginFiles) {
  const plugin = require(`./plugins/${file}`);
  if (plugin && plugin.handler && plugin.pattern) {
    plugins.push(plugin);
  }
}

// Handle all messages
bot.on('message', async (msg) => {
  if (!msg.text) return;
  const text = msg.text.trim();

  // Check for multiple prefixes (/ and .)
  for (const plugin of plugins) {
    const patterns = Array.isArray(plugin.pattern) ? plugin.pattern : [plugin.pattern];
    if (patterns.some(p => p.test(text))) {
      try {
        await plugin.handler(bot, msg);
      } catch (err) {
        console.error(`Error in plugin ${plugin.command}:`, err);
        bot.sendMessage(msg.chat.id, `⚠️ Error running command: ${plugin.command}`);
      }
      break; // Stop after first matching command
    }
  }
});