const puppeteer = require('puppeteer');
const { findElements } = require('../basicElement/findElements');
const { sleeper } = require('../functions/toolsFunctions');

let browser;
let page;  

exports.launchingPup = async (url, ctx, bot) => {
  try {
    browser = await puppeteer.launch({
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
      headless: false,
      defaultViewport: false,
      userDataDir: './tmp',
      //args: ['--proxy-server=http://127.0.0.1:10809']
    });

    page = await browser.newPage();

    await page.goto(url);

    await sleeper(2000);




    await findElements(page, sleeper, ctx, bot);
  } catch (error) {
    console.log(error);
  }

};

exports.getPage = () => {
  return page;
};

exports.browser = async() => {
  await browser.close();
};