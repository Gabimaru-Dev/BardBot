module.exports = {
  command: 'help',
  pattern: /\.help/,
  handler: (bot, msg) => {
    const text = `
*Commands List:*
.active – confirm my presence 
.joke – A random joke 
.time – current time in Nigeria 
`;
    bot.sendMessage(msg.chat.id, text, { parse_mode: 'Markdown' });
  }
};