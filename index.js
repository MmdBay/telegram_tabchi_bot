require('dotenv').config();
const { Bot, session } = require("grammy");
const schedule = require('node-schedule'); require('moment-timezone');
const { connectToDatabase } = require('./db/conctions')
const moment = require("jalali-moment"); require("moment-timezone");

// func
const { insertAdmins, insertNumber, insertTheWordsOfElders } = require('./db/insert');
const { irTimeTheWordsOfElders, oneApiWordsOfElders } = require('./components/data/text.componenet');
const { startingTab } = require('./components/bot/starting');
const { onPageUsers } = require('./components/events/on/onUserResponse');
const { groupSender } = require('./components/basicElement/groupSendMessage');
const { browser } = require('./components/code/launch.pupp');
const { gen } = require('./components/chatBot/textGeneration');
const { findAllWordsWithMinTimestamp, findAllData } = require('./db/find');
const { updateTheWords } = require('./db/update');
const { morningSender } = require('./components/messages/morning.sender');


const bot = new Bot(process.env.BOT_TOKEN);



connectToDatabase();

// bot.catch((err) => {
//     const ctx = err.ctx;
//     console.error(`Error while handling update ${ctx.update.update_id}:`);
//     const e = err.error;
//     if (e instanceof GrammyError) {
//         console.error("Error in request:", e.description);
//     } else if (e instanceof HttpError) {
//         console.error("Could not contact Telegram:", e);
//     } else {
//         console.error("Unknown error:", e);
//     }
// });

function initial() {
    return { code: '' };
}
bot.use(session({ initial }));

// bot.use((ctx, next) => {
//     if (ctx.from.id == process.env.ADMIN) {
//         next();
//     } else {
//         ctx.reply('❌')
//     }
// })


bot.command('start', (ctx) => {

    ctx.reply(`ادمین عزیز به پنل مدیریتی خوش اومدی، چه کاری از دستم بر میاد؟\n\n▫️`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: `شروع به کار 💹`, callback_data: 'start' }],
                [{ text: 'بخش آمار 📊', callback_data: 'status' }, { text: 'گروه ها 👥', callback_data: 'status' }],
                [{ text: 'کاربران 👤', callback_data: 'status' }, { text: 'لینکدونی ها 🌠', callback_data: 'status' }],
                [{ text: 'اکانت ها 📱', callback_data: 'status' }],
                [{ text: 'وضعیت اکانت ها 📂', callback_data: 'status' }],
                [{ text: 'توقف ربات ❌', callback_data: 'close_browser' }]
            ]
        }
    }).catch(err => {
        console.log(err);
    })
})


// add admins
bot.command('addadmin', async ctx => {
    const admin = ctx.match.split(' ');

    const response = await insertAdmins(admin[0], admin[1])

    console.log(response);
    if (response) {
        ctx.reply(`ادمین با چن آیدی ${admin[0]} و Rule ${admin[1]} به لیست ادمین ها افزوده شد.`).catch(err => {
            console.log(err);
        })
    }
    if (!response) {
        ctx.reply('این ادمین قبلا در لیست ادمین ها وجود دارد!').catch(err => {
            console.log(err);
        })
    }
})

// setInterval(async () => {
//     try {
//         // const response = await irTimeTheWordsOfElders().catch(err => {
//         //     console.log(err);
//         // })
//         const response = await oneApiWordsOfElders().catch(err => {
//             console.log(err);
//         })
//         // console.log(response);
//         await insertTheWordsOfElders(response)
//         // await bot.api.sendMessage(1430613559, `${response.wordsRandom}\n\nاز : ${response.wordsRandomNameGenerator}\n${response.wordsRandomNameGeneratorContent ? response.wordsRandomNameGeneratorContent + '\n' : ''}\nمـشـاورهـ بـهشتـے🌾`).catch(err => {
//         //     console.log(err);
//         // })

//     } catch (error) {
//         console.log(error + ' ');
//     }


// }, 4000)

// add number
bot.command('addphone', async ctx => {
    const phone = ctx.match;
    const response = await insertNumber(phone)
    if (response) {
        ctx.reply(`شماره ${phone} به دیتا بیس اضافه شد.`).catch(err => {
            console.log(err);
        })
    }
    if (!response) {
        ctx.reply('این ادمین قبلا در لیست ادمین ها وجود دارد!').catch(err => {
            console.log(err);
        })
    }
})


// bot.on('msg:text', async (ctx) => {
//     const responsePrompt = await gen(ctx.message.text);

//     await ctx.reply(responsePrompt).catch(err => {
//         console.log(err);
//     })
// })

bot.callbackQuery('close_browser', async ctx => {
    try {
        await ctx.answerCallbackQuery('Ook!').catch(err => {
            console.log(err);
        })
        await browser()
    } catch (error) {
        console.log(error + '');
    }
})



bot.hears(/^[0-9]+$/, async (ctx) => {
    if (ctx.session.code === 'code') {
        ctx.session.code = ctx.message.text
    }
})

startingTab(bot);

// setTimeout(async() => {
//     function waitForPageDataScraper() {
//         return new Promise(async (resolve, reject) => {
//             const dataPage = await onPageUsers()

//             console.log(dataPage);
//             if (dataPage) {
//                 resolve(true)
//             }
//             if (!dataPage) {
//                 reject(false)
//             }
//         })
//     }

//     try {
//         const checkSuccesCrowlwrPage = await waitForPageDataScraper()
//         if (checkSuccesCrowlwrPage) {
//             // await groupSender()
//             await morningSender()
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }, 20000)
const tehranTimeZone = 'Asia/Tehran';
const cronRule = new schedule.RecurrenceRule();
cronRule.tz = tehranTimeZone;
cronRule.hour = [8, 12, 16, 21, 0];
cronRule.minute = 10;
cronRule.second = 10



// setTimeout(async() => {
    schedule.scheduleJob(cronRule, async (r) => {
    const timeAdded = moment().locale("fa").tz("Asia/Tehran").format("h");

    function waitForPageDataScraper() {
        return new Promise(async (resolve, reject) => {
            const dataPage = await onPageUsers()

            console.log(dataPage);
            if (dataPage) {
                resolve(true)
            }
            if (!dataPage) {
                reject(false)
            }
        })
    }

    try {
        const checkSuccesCrowlwrPage = await waitForPageDataScraper()
        console.log(checkSuccesCrowlwrPage);
        if (checkSuccesCrowlwrPage) {
            if (timeAdded == 8) {
                await morningSender()
            } else if (timeAdded == 12) {
                await groupSender()
            } else if (timeAdded == 16) {
                await groupSender()
            } else if (timeAdded == 21) {
                await groupSender()
            } else if (timeAdded == 1) {
                await groupSender()
            }
        }
    } catch (error) {
        console.log(error);
    }
    })
// }, 30000)


bot.start();
