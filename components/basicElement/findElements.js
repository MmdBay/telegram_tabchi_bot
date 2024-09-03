exports.findElements = async (page, sleeper, ctx, bot) => {
    try {
        
        const loginNumberElement = await page.waitForSelector('#auth-pages > div > div.tabs-container.auth-pages__container > div.tabs-tab.page-sign.active > div > div.input-wrapper > button > div');
        const inputSelectorPhoneNumber = '#auth-pages > div > div.tabs-container.auth-pages__container > div.tabs-tab.page-sign.active > div > div.input-wrapper > div.input-field.input-field-phone > div.input-field-input';
        
        console.log(loginNumberElement);
        if (!loginNumberElement) {
            ctx.reply('قبلا با این شماره وارد تلگرام شدین.')
            return
        }
        const codeMessageId = await ctx.reply('!شروع پروسه لاگین');

        // if (loginNumberElement) {
        //     await page.click('#auth-qr-form > div > button');
        // }

        const waitShowPhoneNumberInputElement = await page.waitForSelector(inputSelectorPhoneNumber);

        if (waitShowPhoneNumberInputElement) {
            const inputElement = await page.$(inputSelectorPhoneNumber);

            await inputElement.type('', { delay: 12 });

            await page.type(inputSelectorPhoneNumber, '9195940958', { delay: 352 });

            await bot.api.editMessageText(ctx.from.id, codeMessageId.message_id, 'درحال ارسال شماره به تلگرام!')

            await page.click('#auth-pages > div > div.tabs-container.auth-pages__container > div.tabs-tab.page-sign.active > div > div.input-wrapper > button > div')

            await sleeper(8000);

            ctx.session.code = 'code';

            const validInputNumber = await page.$eval('#auth-pages > div > div.tabs-container.auth-pages__container > div.tabs-tab.page-authCode.active > div > div.input-wrapper > button > span.i18n', element => {
                return element.textContent;
            });

            console.log(validInputNumber);
            if (validInputNumber !== 'ارسال کد با استفاده از پیامک') {
                await bot.api.editMessageText(ctx.from.id, codeMessageId.message_id, `شماره بن شده❌\nارور دریافت شده از تلگرام : \n\n${validInputNumber}`).catch(err => {
                    console.log(err);
                })
                return
            }

            const loginCodeElement = await page.waitForSelector('#auth-pages > div > div.tabs-container.auth-pages__container > div.tabs-tab.page-authCode.active > div > div.input-wrapper > div > input');
            if (loginCodeElement) {
                await bot.api.editMessageText(ctx.from.id, codeMessageId.message_id, 'کد برای شما ارسال شد لطفا کد دریافتی را وارد کنید!').catch(err => {
                    console.log(err);
                })
            }

            while (ctx.session.code === 'code') {
                await sleeper(1000);
            }


            if (ctx.session.code !== 'code') {
                await bot.api.editMessageText(ctx.from.id, codeMessageId.message_id, 'درحال لاگین به اکانت شما...').catch(err => {
                    console.log(err);
                })
            }


            if (loginCodeElement) {
                await page.type('#auth-pages > div > div.tabs-container.auth-pages__container > div.tabs-tab.page-authCode.active > div > div.input-wrapper > div > input', ctx.session.code, { delay: 19 });
            }
            await sleeper(3000);
            while (true) {
                await sleeper(3000);
                mesId = codeMessageId.message_id

                const validCode = await page.$eval('#auth-pages > div > div.tabs-container.auth-pages__container > div.tabs-tab.page-authCode.active > div > div.input-wrapper > div > input', element => {
                    return element.getAttribute('aria-label');
                });

                if (validCode === 'Invalid code.') {
                    await bot.api.editMessageText(ctx.from.id, mesId, 'کد نادرست است، لطفا کد صحیح را ارسال کنید.').catch(err => {
                        console.log(err);
                    })
                    ctx.session.code = 'code';

                    while (ctx.session.code === 'code') {
                        await sleeper(1000);
                    }
                    console.log(ctx.session.code);
                    if (ctx.session.code !== 'code') {
                        await bot.api.editMessageText(ctx.from.id, mesId, 'درحال لاگین به اکانت شما...').catch(err => {
                            console.log(err);
                        })
                    }

                    await page.$eval('#auth-pages > div > div.tabs-container.auth-pages__container > div.tabs-tab.page-authCode.active > div > div.input-wrapper > div > input', inputElement => {
                        inputElement.value = '';
                    });

                    await page.type('#auth-pages > div > div.tabs-container.auth-pages__container > div.tabs-tab.page-authCode.active > div > div.input-wrapper > div > input', ctx.session.code, { delay: 19 }).catch(err => {
                        console.log(err);
                    })
                    ctx.session.code = '';
                } else {
                    await ctx.reply('با موفقیت لاگین شدین✅').catch(err => {
                        console.log(err);
                    })
                    break;
                }
            }
        }

    } catch (error) {
        if (error.name === 'TimeoutError') {
            ctx.reply('قبلا با این شماره وارد تلگرام شدین.').catch(err => {
                console.log(err);
            })
        } else {
            // Handle other errors
            console.error('Error:', error);
        }
    }
};
