module.exports = {
  command: 'id',
  description: 'Show your user or group ID',
  pattern: /^\.id$/i,
  handler: async (bot, msg) => {
    const isGroup = msg.chat.type.endsWith('group');
    const idText = isGroup
      ? `Group ID: \`${msg.chat.id}\`\nYour ID: \`${msg.from.id}\``
      : `Your ID: \`${msg.from.id}\``;
    bot.sendMessage(msg.chat.id, idText, { parse_mode: 'Markdown' });
  }
};