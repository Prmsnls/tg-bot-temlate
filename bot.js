require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

const token = process.env.BOT_TOKEN; // Replace with your bot token
const bot = new Telegraf(token);

// Create an Express server to serve the mini app
const app = express();
const PORT = process.env.PORT || 3500;
// Serve the static files for the mini app
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Set custom menu button
bot.command("setmenu", (ctx) => {
    ctx.setChatMenuButton({
      text: "Wallet",
      type: "web_app",
      web_app: { url: "https://app.smartdonna.com" } // Update this URL
    });
});

bot.start((ctx) => {
  ctx.reply('Choose an option:', {
    reply_markup: {
      keyboard: [
        [
          {
            text: '💸 Send Tokens',
            web_app: { url: `https://example.com/send-tokens` } // Update this URL
          },
          {
            text: '💪 Earn',
            web_app: { url: `https://example.com/earn` } // Update this URL
          }
        ]
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  });
});

bot.launch();

console.log('Bot is up and running');