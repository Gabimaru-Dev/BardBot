module.exports = {
  command: 'uptime',
  description: 'Get the system uptime',
  pattern: /^\.uptime$/i,
  handler: async (bot, msg) => {
    const os = require('os');
    const uptime = os.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    await bot.sendMessage(msg.chat.id, `System Uptime: ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
  }
};