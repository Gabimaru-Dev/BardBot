module.exports = {
  command: 'ping',
  description: 'Check if the bot is alive',
  pattern: /^\.ping$/i,
  handler: async (bot, msg) => {
    const start = Date.now();
    const sent = await bot.sendMessage(msg.chat.id, '🏓 Pinging...');
    const diff = Date.now() - start;
    bot.editMessageText(`✅ Pong! ${diff}ms`, {
      chat_id: sent.chat.id,
      message_id: sent.message_id
    });
  }
};