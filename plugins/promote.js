module.exports = {
  command: 'promote',
  pattern: /^(\.|\!)promote\s+(\d+)/i,

  handler: async (bot, msg) => {
    const chatId = msg.chat.id;
    const userId = msg.text.split(/\s+/)[1];

    if (!msg.chat.type.endsWith('group')) {
      return bot.sendMessage(chatId, "This command only works in groups.");
    }

    try {
      const admins = await bot.getChatAdministrators(chatId);
      const isBotAdmin = admins.find(admin => admin.user.id === bot.botInfo.id);
      const isSenderAdmin = admins.find(admin => admin.user.id === msg.from.id);

      if (!isBotAdmin) return bot.sendMessage(chatId, "I need to be an admin to promote someone.");
      if (!isSenderAdmin) return bot.sendMessage(chatId, "You must be an admin to use this command.");

      await bot.promoteChatMember(chatId, parseInt(userId), {
        can_change_info: true,
        can_delete_messages: true,
        can_invite_users: true,
        can_restrict_members: false,
        can_pin_messages: true,
        can_promote_members: false,
        can_manage_video_chats: true
      });

      bot.sendMessage(chatId, `✅ Promoted user with ID ${userId} to admin.`);
    } catch (err) {
      bot.sendMessage(chatId, `❌ Failed to promote user ID ${userId}. Make sure the ID is correct and the user is in the group.`);
    }
  }
};