const { findPhones } = require('../../db/find')
const { launchingPup } = require('../code/launch.pupp')

exports.startingTab = (bot) => {
    try {
        bot.callbackQuery('start',async ctx => {
            // const phones = await findPhones()
    
            await ctx.answerCallbackQuery('Ook!').catch(err => {
                console.log(err);
            })
    
            // let keyborad = []
            // phones.forEach(phone => {
            //     keyborad.push([{
            //         text: phone.phone,
            //         callback_data: phone.phone
            //     }])
            // });
    
            // await ctx.reply('لیست اکانت های موجود به شرح زیر میباشد\n\n▫️', {
            //     reply_markup: {
            //         inline_keyboard: keyborad
            //     }
            // })
            await launchingPup('https://web.eitaa.com/', ctx, bot)
        })
    } catch (error) {
        console.log(error);
    }
}