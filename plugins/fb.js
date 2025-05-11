const axios = require("axios");

module.exports = {
  command: "fb",
  description: "Download Facebook video",
  pattern: /^\.fb\s+(https?:\/\/[^\s]+)/i,
  handler: async (bot, msg) => {
    const match = msg.text.match(/^\.fb\s+(https?:\/\/[^\s]+)/i);
    if (!match) {
      return bot.sendMessage(msg.chat.id, "❌ Please provide a valid Facebook video URL.");
    }

    const url = match[1];
    const api = `https://api.vreden.my.id/api/fbdl?url=${encodeURIComponent(url)}`;

    try {
      const { data } = await axios.get(api);

      if (!data || !data.data || !data.data.status) {
        return bot.sendMessage(msg.chat.id, "❌ Failed to fetch video. Make sure the link is public.");
      }

      const result = data.data;
      const caption = `*Title:* ${result.title || "Facebook Video"}\nSending HD version...`;

      await bot.sendMessage(msg.chat.id, caption, { parse_mode: "Markdown" });

      await bot.sendVideo(msg.chat.id, result.hd_url, {
        caption: result.title || "Facebook Video"
      });

    } catch (err) {
      console.error(err);
      bot.sendMessage(msg.chat.id, "⚠️ Error occurred while downloading the video.");
    }
  },
};