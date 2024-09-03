const { morining } = require("../api/morning");

const { findAllData, findAllAngizeshiWithMinTimestamp } = require("../../db/find");
const { updateTheWords, updateTheAngizeshi } = require("../../db/update");
const { getPage } = require("../code/launch.pupp");
const { sleeper } = require("../functions/toolsFunctions");
const clipboardy = require('clipboardy');

exports.morningSender = async () => {
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
                    const selector = `a[href="${hrefValue}"]`;
                    await page.waitForSelector(selector);
                    await page.click(selector);
                }

                try {
                    await clickLinkByHref(page, `#1430613559`);
                } catch (error) {
                    console.error(error + '');
                }

                const allDataMorning = await morining()
                let monasebat = '';
                for (let item of allDataMorning.monasebat_emroz.events) {
                    monasebat += item.description + '\n'
                }
                await sleeper(2000)
                const elementSelector = '#column-center > div > div > div.chat-input.chat-input-main > div > div.rows-wrapper-wrapper > div > div.new-message-wrapper.rows-wrapper-row > div.input-message-container > div:nth-child(1)';
                const element = await page.$(elementSelector);
                if (element) {
                    console.log('groups');
                    const word = await findAllAngizeshiWithMinTimestamp()
                    const idWord = word._id.toString()
                    await updateTheAngizeshi(idWord)
                    if (word) {
                        try {
                        } catch (error) {
                            console.log(error + '');
                        }
                        await clipboardy.write(`📚
**سلام صبح بخیر صبحتون پراز عشق وامید🩵♥️**\n
🔷🔸${word.data.angizeshi}

**🟪مناسبت های امروز :**\n${monasebat}
**🟡نرخ ها :**
نرخ دلار : **${allDataMorning.geymat_dollar} تومان**
نرخ مثقال طلا : **${allDataMorning.geymat_mesghal } تومان**
نرخ سکه امامی : **${allDataMorning.seke_emami} تومان**
نرخ سکه بهار آزادی : **${allDataMorning.seke_bahar} تومان**
نرخ نیم سکه : **${allDataMorning.seke_nim} تومان**
نرخ ربع سکه : **${allDataMorning.seke_rob} تومان**
نرخ هر گرم سکه : **${allDataMorning.seke_gerami} تومان**

**📅تاریخ امروز : ${allDataMorning.emroze_date} ${allDataMorning.emroze_day}**

**@Moshavere_beheshti 🌾**

📚`);
                        await page.focus('#column-center > div > div > div.chat-input.chat-input-main > div > div.rows-wrapper-wrapper > div > div.new-message-wrapper.rows-wrapper-row > div.input-message-container > div:nth-child(1)');
                        await page.keyboard.down('Control');
                        await page.keyboard.press('V');
                        await page.keyboard.up('Control');
                        await sleeper(2000)
                        await page.keyboard.press('Enter');
                        text = ''
                    } else {
                        return false;
                    }
                } else {
                    console.log('Not Group!');
                }
            }
        }
    } catch (error) {
        if (error.name === 'TimeoutError') {
            console.log(error.name);
        } else {
            console.error('Error:', error);
        }
    }
};
