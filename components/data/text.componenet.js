const cheerio = require('cheerio');
const cloudscraper = require('cloudscraper');


exports.irTimeTheWordsOfElders = async () => {
    const allHtmlData = await cloudscraper.get('https://www.time.ir');

    const $ = cheerio.load(allHtmlData);

    const verses = [];
    verses.push($('.randomQuote > span').contents().filter(function() {
        return this.nodeType === 3;
    }).text().trim());
    
    $('.randomQuote > span > div').each(function () {
        const verseText = $(this).text().trim();
        verses.push(verseText);
    });
    
    const wordsRandom = verses.join('\n');
    // console.log(wordsRandom);
    

    const wordsRandomNameGenerator = $('.randomQuote > .reverseAlign > a').text().trim()
    const wordsRandomNameGeneratorContent = $('.randomQuote > .reverseAlign > span').attr('data-content')

    // console.log(wordsRandom);
    return {
        wordsRandom: wordsRandom,
        wordsRandomNameGenerator: wordsRandomNameGenerator,
        wordsRandomNameGeneratorContent: wordsRandomNameGeneratorContent,
        sended: false,
        time: new Date().getTime()
    }
}

exports.oneApiWordsOfElders = async () => {
    const allHtmlData = await cloudscraper.get('https://one-api.ir/sokhan/?token=293512:65a3bc313454c&action=random');

    const data = JSON.parse(allHtmlData)

    // console.log(data);
    return {
        wordsRandom: data.result.text,
        wordsRandomNameGenerator: data.result.author,
        wordsRandomNameGeneratorContent: data.result.author_id,
        sended: false,
        time: new Date().getTime()
    }
}