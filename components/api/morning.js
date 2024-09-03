const axios = require('axios');
const moment = require("jalali-moment"); require("moment-timezone"); require("moment-duration-format");
const cheerio = require('cheerio')


exports.morining = async () => {
    const tehranTimeOptions = {
        timeZone: 'Asia/Tehran',
        hour12: false,
    };
    
    
    const currentDateTime = new Date().toLocaleString('fa-IR', tehranTimeOptions);
    const date = moment().locale("fa").tz("Asia/Tehran").format("dddd")
    
    const year = moment().locale("fa").tz("Asia/Tehran").format("YYYY")
    const month = moment().locale("fa").tz("Asia/Tehran").format("M")
    const day = moment().locale("fa").tz("Asia/Tehran").format("D")

    const { data: todaysOccasion } = await axios(`https://holidayapi.ir/jalali/${year}/${month}/${day}`)
    const { data: dollar } = await axios(`https://raw.githubusercontent.com/margani/pricedb/main/tgju/current/price_dollar_rl/latest.json`)
    const { data: mesghal } = await axios(`https://raw.githubusercontent.com/margani/pricedb/main/tgju/current/mesghal/latest.json`)
    const { data: retailSekee } = await axios(`https://raw.githubusercontent.com/margani/pricedb/main/tgju/current/retail_sekee/latest.json`)
    const { data: retailSekeb } = await axios(`https://raw.githubusercontent.com/margani/pricedb/main/tgju/current/retail_sekeb/latest.json`)
    const { data: retailNim } = await axios(`https://raw.githubusercontent.com/margani/pricedb/main/tgju/current/retail_nim/latest.json`)
    const { data: retailRob } = await axios(`https://raw.githubusercontent.com/margani/pricedb/main/tgju/current/retail_rob/latest.json`)
    const { data: retailGerami } = await axios(`https://raw.githubusercontent.com/margani/pricedb/main/tgju/current/retail_gerami/latest.json`)

    
    return {
        monasebat_emroz: todaysOccasion,
        geymat_dollar: dollar.p,
        geymat_mesghal: mesghal.p,
        seke_emami: retailSekee.p,
        seke_bahar: retailSekeb.p,
        seke_nim: retailNim.p,
        seke_rob: retailRob.p,
        seke_gerami: retailGerami.p,
        emroze_date: currentDateTime,
        emroze_day: date 
    }
}