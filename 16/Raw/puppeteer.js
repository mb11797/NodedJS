// https://github.com/puppeteer/puppeteer/blob/main/docs/api.md
let puppeteer = require("puppeteer");

(async function () {
    //Browser create
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--incognito", "-start-maximized"]
    })

    // create tab (or here page)
    let pages = await browser.pages();
    // page => represent on tab
    // await browser.newPage();
    // await browser.newPage();
    let page = pages[0];
    await page.goto("http://www.google.com");

})();
