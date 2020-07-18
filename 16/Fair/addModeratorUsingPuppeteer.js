let puppeteer = require("puppeteer");
let fs = require("fs");

let userToAdd = process.argv[3];

(async function () {
    try {
        let credentialFile = await fs.promises.readFile(process.argv[2]);
        const hrankCred = JSON.parse(credentialFile);
        const { user, password, url } = hrankCred;

        //create browser
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--incognito", "-start-maximized"]
        })

        //create tab
        let tabs = await browser.pages();
        //open new tab
        //await browser.newPage();
        // tab=> represent one tab
        let tab = tabs[0];
        await tab.goto(url, { waitUntil: "networkidle0" });
        // wait for selector
        // file backend => browser => print UI
        await tab.waitForSelector("#input-1");
        await tab.type("#input-1", user, {
            delay: 100
        })

        await tab.waitForSelector("#input-2");
        await tab.type('#input-2', password);
        // await tab.click("button[data-analytics=LoginPassword]");
        await Promise.all([
            tab.waitForNavigation("networkidle0"),       // the promise resolves after navigation has finished
            tab.click("button[data-analytics=LoginPassword]")      //clicking the link will indirectly cause a navigation
            //indirectly cause a navigation
        ]);

        // ********************************Dashboard****************************************
        await tab.waitForSelector("a[data-analytics=NavBarProfileDropDown]");
        await tab.click("a[data-analytics=NavBarProfileDropDown]");
        await Promise.all([
            tab.waitForNavigation({ waitUntil: "networkidle0" }),     //the promise resolves after navigation has finished
            tab.click("a[data-analytics=NavBarProfileDropDownAdministration]")
        ]);

        // await tab.waitForSelector(".administration header ul li");
        await tab.waitForSelector("section header ul li");

        // selenium => findElement => tab.$()
        // selenium => findElements => tabs.$$()
        let manageTabsList = await tab.$$("section header ul li");
        await Promise.all([
            tab.waitForNavigation({ waitUntil: "networkidle0" }),
            manageTabsList[1].click()
        ])

        //question to visit
        //question => page
        let manageCurrURL = tab.url();

        let qIdx = 0;
        while (true) {
            let qElement = await getQuestionElement(qIdx, manageCurrURL, tab);
            if (qElement == null)
                return;

            await handleQuestion(qElement, tab);
            qIdx++;
        }
    }
    catch (err) {
        console.log(err.message);
    }
})();

async function getQuestionElement(qIdx, manageCurrURL, tab) {
    await tab.goto(manageCurrURL, { waitUntil: "networkidle0" });
    //pageNumer => 1 page => 10 questions
    let pageIdx = parseInt(qIdx / 10);
    let queOnPageIdx = qIdx % 10;
    console.log(`${pageIdx}  ${queOnPageIdx}`);

    //go to respective page
    await tab.waitForSelector(".pagination ul li");
    let pageElements = await tab.$$(".pagination ul li");
    let nextBtn = pageElements[pageElements.length - 2];

    for (let i = 0; i < pageIdx; i++) {
        await Promise.all([
            tab.waitForNavigation({ waitUntil: "networkidle0" }),
            nextBtn.click()
        ])

        await tab.waitForSelector(".pagination ul li");
        pageElements = await tab.$$(".pagination ul li");
        nextBtn = pageElements[pageElements.length - 2];
    }

    await tab.waitForSelector(".backbone.block-center");
    let qList = await tab.$$(".backbone.block-center");
    if (queOnPageIdx < qList.length) {
        return qList[queOnPageIdx];
    }
    else {
        return null;
    }
}

//HW
async function handleQuestion(qElement, tab) {
    //getAttribute 
    // let href = anchor.getAttribute("href");
    // let href = await tab.evaluate(function(element){
    //     return element.getAttribute("href");
    // }, qElement);
    await qElement.click();
    // await tab.waitForSelector('.tagsinput');
    await tab.waitForSelector('.tags_clear');
    // await tab.waitForNavigation({waitUntil: "networkidle0"});
    // let manageTabsList = await tab.$$(".cursor.change-tab.cep");
    // await manageTabsList[1].click();

    await tab.waitForSelector("li[data-tab=moderators]");
    await Promise.all([
        tab.waitForNavigation({waitUntil: "networkidle0"}),
        tab.click("li[data-tab=moderators] a"),
        // tab.click("a[class=cursor.change-tab.cep]")
    ])

    // let manageTabsList = await tab.$(".nav-tabs.nav.admin-tabbed-nav.row li");
    // await Promise.all([
    //     tab.waitForNavigation({ waitUntil: "networkidle0" }),
    //     manageTabsList[1].click()
    // ])

    await tab.waitForSelector("#moderator");
    await tab.type('#moderator', userToAdd, {delay: 100});
    await tab.keyboard.press("Enter");
    return;
}