// Created by t.me/ayokunledavid 
// YouTube: @GabimaruTech
const axios = require('axios');

module.exports = {
  command: 'tiktok',
  description: 'Download a TikTok video using a valid TikTok URL.',
  pattern: [/^\.tiktok(?: |$)/i, /^\/tiktok(?: |$)/i],
  handler: async (bot, msg) => {
    const text = msg.text?.trim().split(/\s+/).slice(1).join(' ');
    const urlRegex = /(https?:\/\/)?(www\.)?(tiktok\.com\/.+|vm\.tiktok\.com\/\S+)/;

    if (!text || !urlRegex.test(text)) {
      return bot.sendMessage(msg.chat.id, '❌ Please provide a valid TikTok link.\n\nExample:\n`.tiktok https://www.tiktok.com/@user/video/12345`');
    }

    const loadingMsg = await bot.sendMessage(msg.chat.id, '⏳ Fetching TikTok video, please wait...');

    try {
      const res = await axios.get(`https://apis.davidcyriltech.my.id/download/tiktok?url=${encodeURIComponent(text)}`);
      const result = res.data;

      if (!result || !result.video) throw new Error('No video found.');

      await bot.sendVideo(msg.chat.id, result.video, {
        caption: `✅ *TikTok Video Downloaded Successfully*\n\n*Author:* ${result.author?.nickname || 'Unknown'}\n*Description:* ${result.description || 'No caption.'}`,
        parse_mode: 'Markdown'
      });

    } catch (err) {
      await bot.sendMessage(msg.chat.id, '❌ Failed to fetch TikTok video. It may be private, broken, or unsupported.');
    } finally {
      await bot.deleteMessage(msg.chat.id, loadingMsg.message_id).catch(() => {});
    }
  }
};