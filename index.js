const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN || '7508572561:AAEqTsTjzZAgt3EUR3K2yBCdxlrL6lZheds';
const bot = new TelegramBot(token, { polling: true });

console.log('Hark! The BardBot hath awaken!');

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Hail, noble ${msg.from.first_name}! I am *The BardBot*, a humble servant of thine queries. Type *.help* to learn mine powers.`,
    { parse_mode: 'Markdown' }
  );
});

bot.onText(/\.active/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Verily, I am awake and most attentive!');
});

bot.onText(/\.help/, (msg) => {
  const helpMsg = `
*Commands of Noble Utility:*

.active – Doth confirm mine presence  
.joke – A jest to stir thy soul  
.time – Speaketh of the current hour  
.quote – Wisdom from ages past  
.reverse <text> – Let me mirror thy words  
`;
  bot.sendMessage(msg.chat.id, helpMsg, { parse_mode: 'Markdown' });
});

bot.onText(/\.joke/, (msg) => {
  const jests = [
    "Why did the coder taketh rest? For his loop had no end!",
    "To code or not to code — that is the error!",
    "I clicked, therefore it broketh.",
    "Thine array overfloweth like a goblet unguarded.",
  ];
  const jest = jests[Math.floor(Math.random() * jests.length)];
  bot.sendMessage(msg.chat.id, jest);
});

bot.onText(/\.time/, (msg) => {
  const time = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
  bot.sendMessage(msg.chat.id, `The hour is presently: ${time}`);
});

bot.onText(/\.quote/, (msg) => {
  const quotes = [
    "Wisdom crieth in the streets, yet few lend ear.",
    "Speak but one true word, and silence shall follow in awe.",
    "Greatness is oft found in quiet deeds.",
    "Be not afeard; the isle is full of noises, sounds, and sweet airs.",
    "Some are born great, some achieve greatness, and some have greatness thrust upon 'em.",
  ];
  const verse = quotes[Math.floor(Math.random() * quotes.length)];
  bot.sendMessage(msg.chat.id, `“${verse}”`);
});

bot.onText(/\.reverse (.+)/, (msg, match) => {
  const phrase = match[1];
  const mirrored = phrase.split('').reverse().join('');
  bot.sendMessage(msg.chat.id, `Behold, thy words reversed: *${mirrored}*`, { parse_mode: 'Markdown' });
});
console.log("Bardbot is running 🏃");