module.exports = {
  command: 'joke',
  pattern: /\.joke/,
  handler: (bot, msg) => {
    const jokes = [
      "Why don’t programmers like nature? It has too many bugs.",
      "Why do Java developers wear glasses? Because they can’t C#.",
      "I told my computer I needed a break, and it said: 'No problem, I'll go to sleep.'"
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    bot.sendMessage(msg.chat.id, joke);
  }
};