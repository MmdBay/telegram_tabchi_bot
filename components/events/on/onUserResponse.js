const { insertAllData } = require("../../../db/insert");
const { getPage } = require("../../code/launch.pupp")
const cheerio = require('cheerio');

const onPageUsers = async () => {
  try {
    const page = getPage();

    if (!page) {
      return
    }

    const pageContent = await page.content();


    // function convertStringToNumber(str) {
    //   try {
    //     const multiplier = {
    //       'K': 1000,
    //       'M': 1000000,
    //       'B': 1000000000,
    //     };

    //     // Replace commas with dots
    //     const cleanedStr = str.replace(',', '.');

    //     const match = cleanedStr.match(/^([\d.]+)([KMB])$/);

    //     if (match) {
    //       const value = parseFloat(match[1]);
    //       const suffix = match[2];

    //       if (multiplier[suffix]) {
    //         return value * multiplier[suffix];
    //       } else {
    //         return value;
    //       }
    //     } else {
    //       return NaN;
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    // Wait for some time to see the effect
    await page.waitForTimeout(2000);
    const $ = cheerio.load(pageContent);

    const userData = [];
    $('#folders-container > div.scrollable.scrollable-y.tabs-tab.chatlist-parts.active > div.chatlist-top > ul.chatlist > li').each(async (i, el) => {
      const chatNumber = $(el).find('.dialog-subtitle-badge').text()
      userData.push({
        chat_id: $(el).attr('data-peer-id'),
        name: $(el).find('#folders-container > div.scrollable.scrollable-y.tabs-tab.chatlist-parts.active > div.chatlist-top > ul.chatlist > li:nth-child(4) > div.user-caption > p.dialog-title > span.user-title.tgico').text(),
        // chat_show: chatNumber.includes('K') ? convertStringToNumber(chatNumber) : Number(chatNumber),
      })
    });

    console.log(userData.length);
    await insertAllData(userData);
    return userData;
  } catch (error) {
    console.log(error);
  }

}

module.exports = {
  onPageUsers: onPageUsers,
}