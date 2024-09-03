const { findAllData, findAllWordsWithMinTimestamp } = require("../../db/find");
const { updateTheWords } = require("../../db/update");
const { getPage } = require("../code/launch.pupp");
const { sleeper } = require("../functions/toolsFunctions");
const clipboardy = require('clipboardy');

exports.groupSender = async () => {
    try {
        const page = getPage()
        if (!page) {
            return
        }

        const groupData = await findAllData();
        const data = groupData[0].data;

        for (let item of data) {
            await sleeper(14000);

            if (item.chat_id.length > 10) {
                async function clickLinkByHref(page, hrefValue) {
                    const selector = `li[data-peer-id="${hrefValue}"]`;
                    await page.waitForSelector(selector);
                    await page.click(selector);
                }

                try {
                    const findChannleSectionElement = await clickLinkByHref(page, `${item.chat_id}`);
                    console.log(findChannleSectionElement);
                    // if (!findChannleSectionElement) {
                    //     return false
                    // }
                } catch (error) {
                    console.error(error + '');
                }


                await sleeper(2000)
                const elementSelector = '#column-center > div > div > div.chat-input > div > div.rows-wrapper.chat-input-wrapper > div.new-message-wrapper > div.input-message-container';
                const element = await page.$(elementSelector);
                if (element) {
                    console.log('groups');
                    const word = await findAllWordsWithMinTimestamp()
                    const idWord = word._id.toString()
                    await updateTheWords(idWord)
                    if (word) {
                        try {
                            // await page.waitForSelector('#portals > div:nth-child(2) > div > div > div.modal-dialog > div.modal-content.custom-scroll > div > button')
                            // await page.click("#portals > div:nth-child(2) > div > div > div.modal-dialog > div.modal-content.custom-scroll > div > button")
                        } catch (error) {
                            console.log(error + '');
                        }
                        await clipboardy.write(`${word.data.wordsRandom}

از : ${word.data.wordsRandomNameGenerator}

@Moshavere_beheshti 🌾`);
                        await page.focus('#column-center > div > div > div.chat-input > div > div.rows-wrapper.chat-input-wrapper > div.new-message-wrapper > div.input-message-container');
                        await page.keyboard.down('Control');
                        await page.keyboard.press('V');
                        await page.keyboard.up('Control');
                        await sleeper(5000)
                        await page.keyboard.press('Enter');
                        await sleeper(5000)
                        text = ''
                    } else {
                        return false;
                    }
                } else {
                    console.log('Not Group!');
                }
            }
        }
        //         let index = 0;

        //         while (true) {
        //             if (index >= data.length) {
        //                 index = 0;
        //             }

        //             const item = data[index];
        //             await sleeper(14000);

        //             if (chatId.length > 10) {
        //                 async function clickLinkByHref(page, hrefValue) {
        //                     const selector = `a[href="${hrefValue}"]`;
        //                     await page.waitForSelector(selector);
        //                     await page.click(selector);
        //                 }

        //                 await clickLinkByHref(page, `#${item.chat_id}`);
        //                 await sleeper(2000);
        //                 const elementSelector = '#editable-message-text';
        //                 const element = await page.$(elementSelector);

        //                 if (element) {
        //                     console.log('groups');
        //                     const word = await findAllWordsWithMinTimestamp();
        //                     const idWord = word._id.toString();
        //                     await updateTheWords(idWord);
        //                     if (word) {
        //                         await clipboardy.write(`${word.data.wordsRandom}

        // از : ${word.data.wordsRandomNameGenerator}

        // مـشـاورهـ بـهشتـے🌾`);
        //                         await page.focus('#editable-message-text');
        //                         await page.keyboard.down('Control');
        //                         await page.keyboard.press('V');
        //                         await page.keyboard.up('Control');
        //                         await sleeper(2000);
        //                         await page.keyboard.press('Enter');
        //                         text = '';
        //                     } else {
        //                         return false;
        //                     }
        //                 } else {
        //                     console.log('Not Group!');
        //                 }
        //                 index++;
        //             } else {
        //                 index++;
        //             }
        //         }


    } catch (error) {
        if (error.name === 'TimeoutError') {
            console.log(error.name);
        } else {
            console.error('Error:', error);
        }
    }
};
