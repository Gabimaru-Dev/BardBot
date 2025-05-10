// Created by t.me/ayokunledavid 
// YouTube: @GabimaruTech
const axios = require('axios');

module.exports = {
  command: 'tiktok',
  description: 'Download TikTok video by URL',
  pattern: /^\.tiktok (https?:\/\/(?:www\.)?tiktok\.com\/.+)$/i,
  handler: async (bot, msg, match) => {
    const url = match[1]; // The TikTok video URL
    const apiUrl = `https://api.vreden.my.id/tiktok?url=${encodeURIComponent(url)}`; // API endpoint

    try {
      // Fetch TikTok video data
      const response = await axios.get(apiUrl);
      const data = response.data;

      // Check if the response is valid
      if (data.status === 200 && data.result.status) {
        const result = data.result;
        
        // Message content for the user
        const message = `
        🌀 *TikTok Video Download* 🌀

        🎥 *Title*: ${result.title}
        🎶 *Music*: ${result.music_info.title} by ${result.music_info.author}
        🗓 *Posted On*: ${result.taken_at}
        🌍 *Region*: ${result.region}
        📊 *Stats*: 
          - Views: ${result.stats.views}
          - Likes: ${result.stats.likes}
          - Comments: ${result.stats.comment}
          - Shares: ${result.stats.share}
          - Downloads: ${result.stats.download}

        📤 *Download Options*:
        - [Video Without Watermark (SD)](${result.data[0].url})
        - [Video Without Watermark (HD)](${result.data[1].url})

        🎵 *Music Download*: [Download Audio](https://www.tikwm.com/video/music/${result.music_info.id}.mp3)

        👤 *Author*: [${result.author.nickname}](https://www.tiktok.com/@${result.author.nickname})
        ![Author Avatar](${result.author.avatar})

        Enjoy the video!
        `;

        // Send the formatted message to the user
        await bot.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });

      } else {
        await bot.sendMessage(msg.chat.id, '❌ Could not fetch the video. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching TikTok video:', error);
      await bot.sendMessage(msg.chat.id, '❌ Something went wrong. Please try again later.');
    }
  }
};