const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');

const token = '7508572561:AAEqTsTjzZAgt3EUR3K2yBCdxlrL6lZheds'; // Replace with your actual token
const SELF_URL = 'https://bardbot-3.onrender.com'; // Replace with your Render web app URL

const bot = new TelegramBot(token, { polling: true });

// Express setup to stay alive on Render
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Self-ping every 5 minutes
setInterval(() => {
  https.get(SELF_URL, (res) => {
    console.log(`Self-ping success at ${new Date().toLocaleTimeString()}`);
  }).on('error', (err) => {
    console.error('Self-ping failed:', err.message);
  });
}, 1000 * 60 * 5); // 5 minutes

// Load all command plugins
const plugins = [];
const pluginFiles = fs.readdirSync(path.join(__dirname, 'plugins')).filter(file => file.endsWith('.js'));

for (const file of pluginFiles) {
  const plugin = require(`./plugins/${file}`);
  if (plugin && plugin.handler && plugin.pattern) {
    plugins.push(plugin);
  }
}

// Message handling with multiple prefixes
bot.on('message', async (msg) => {
  if (!msg.text) return;
  const text = msg.text.trim();

  for (const plugin of plugins) {
    const patterns = Array.isArray(plugin.pattern) ? plugin.pattern : [plugin.pattern];
    if (patterns.some(p => p.test(text))) {
      try {
        await plugin.handler(bot, msg);
      } catch (err) {
        console.error(`Error in plugin ${plugin.command}:`, err);
        bot.sendMessage(msg.chat.id, `⚠️ Error running command: ${plugin.command}`);
      }
      break;
    }
  }
});