
module.exports = {
  command: 'promote',
  description: 'Promote a user to admin in the group.',
  pattern: /^(\.promote|\/promote) (\d+)$/i,  // Matches .promote <user_id> or /promote <user_id>,
  handler: async (bot, msg) => {
    const chatId = msg.chat.id;
    const userId = msg.text.split(' ')[1]; // Extract the user ID from the message
    const from = msg.from;

    try {
      // Get chat administrators
      const chatAdministrators = await bot.getChatAdministrators(chatId);
      const isBotAdmin = chatAdministrators.some(admin => admin.user.id === bot.options.polling.botId);
      
      if (!isBotAdmin) {
        return bot.sendMessage(chatId, "⚠️ I need admin privileges to promote users.");
      }

      // Check if the user issuing the command is an admin
      const isAdmin = chatAdministrators.some(admin => admin.user.id === from.id);
      if (!isAdmin) {
        return bot.sendMessage(chatId, "⚠️ Only admins can promote users.");
      }

      // Promote the user
      await bot.promoteChatMember(chatId, userId, {
        can_change_info: true,
        can_post_messages: true,
        can_edit_messages: true,
        can_delete_messages: true,
        can_invite_to_group: true,
        can_pin_messages: true,
      });

      // Send confirmation
      bot.sendMessage(chatId, `✅ User ${userId} has been promoted to admin!`);
    } catch (err) {
      console.error("Error promoting user:", err);
      bot.sendMessage(chatId, `⚠️ Error: Could not promote the user.`);
    }
  }
};