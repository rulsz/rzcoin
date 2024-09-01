const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('7507093707:AAH2WtcKPHJ_o-7UjwurMnwL96gs7BKTXFU', { polling: true });

bot.getChat('@rulfdyy', (err, chat) => {
  if (err) {
    console.error(err);
  } else {
    const chatId = chat.id;
    console.log(`Chat ID: ${chatId}`);
    // You can now use the chat ID to send messages to the user
    bot.sendMessage(chatId, 'Hello!');
  }
});
