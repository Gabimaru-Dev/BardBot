const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const express = require('express');

// Your bot token here
const TOKEN = '7508572561:AAEqTsTjzZAgt3EUR3K2yBCdxlrL6lZheds';
const bot = new TelegramBot(TOKEN, { polling: true });

// Keep-alive server for Render
const app = express();
app.get('/', (_, res) => res.send('Bot is alive.'));
app.listen(process.env.PORT || 3000);

// Plugin loader
const pluginFolder = path.join(__dirname, 'plugins');
fs.readdirSync(pluginFolder).forEach(file => {
  if (file.endsWith('.js')) {
    const plugin = require(path.join(pluginFolder, file));
    bot.onText(plugin.pattern, (msg, match) => {
      plugin.handler(bot, msg, match);
    });
  }
});
console.log("HARK! The bard as awaken! 🧎‍➡️");