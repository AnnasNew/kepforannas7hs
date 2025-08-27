// telegramBot.js
const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const fs = require('fs');
const config = require('./config');
const { deployToVercel, deployToNetlify } = require('./deployService');

const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);

// ... (Kode untuk isPremium, savePremiumData, checkMembership, dan middleware premium tetap sama)

bot.command('deployvercel', async (ctx) => {
    // ... (Logika validasi yang sama)
    const domainName = args[1];
    const fileId = ctx.message.reply_to_message.document.file_id;

    await ctx.reply('⏳ Sedang memproses deploy ke Vercel...');
    const fileLink = await ctx.telegram.getFileLink(fileId);
    const response = await axios.get(fileLink, { responseType: 'stream' });
    const repoName = `vercel-${domainName}-${Date.now()}`;
    
    const result = await deployToVercel(response.data, domainName, repoName);
    
    if (result.success) {
        await ctx.reply(`✅ Website berhasil di-deploy ke Vercel!\n\n🌐 Domain: ${result.domain}\n📊 Status: ${result.status}`);
    } else {
        await ctx.reply(`❌ Gagal mendeploy ke Vercel. ${result.message}`);
    }
});

// ... (Implementasi bot.command('deploynetlify') yang serupa)

bot.launch();
