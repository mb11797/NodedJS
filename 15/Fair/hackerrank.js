// "url": "https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login"

let fs = require("fs");
require("chromedriver");

let swd = require("selenium-webdriver");
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let cFile = process.argv[2];
let userToAdd = process.argv[3];

// //myFn() banao phir alag se call karo
// async function myFn(){

// }

// myFn();

//alternative way
//function banate hi usko call kar diya
(async function(){
    try{
        //selenium inbuilt
        await driver.manage().setTimeouts({
            implicit:10000,
            pageLoad:10000,
        })
        // buffer credentials
        let bCredentials = await fs.promises.readFile(cFile);
        // let myCredentials = JSON.parse(bCredentials)[2];
        let myCredentials = JSON.parse(bCredentials);
        // console.log(myCredentials);
        let user = myCredentials.user;
        let pwd = myCredentials.password;
        let url = myCredentials.url;

        await driver.get(url);
        // find input-1
        const uNameInputPromise = driver.findElement(swd.By.css("#input-1"));

        //find input-2
        const pwdInputPromise = driver.findElement(swd.By.css("#input-2"));

        let elements = await Promise.all([uNameInputPromise, pwdInputPromise]);
        let uNameWillBeSentPromise = elements[0].sendKeys(user);
        let pwdWillBeSentPromise = elements[1].sendKeys(pwd);
        await Promise.all([uNameWillBeSentPromise, pwdWillBeSentPromise]);
        let sbmtBtn = await driver.findElement(swd.By.css("button[data-analytics=LoginPassword]"));
        await sbmtBtn.click();
        console.log("User logged in");
        let dropdown = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDown]"));
        await dropdown.click();
        let adminBtn = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"))
        await adminBtn.click();
        console.log("Admin page reached");

        await waitForLoader();
        let lis = await driver.findElements(swd.By.css(".administration header ul li"));
        await lis[1].click();

        //manage contest, manage challenge
        //json file read

        let createChallengeBtn = await driver.findElement(swd.By.css(".btn.btn-green.backbone.pull-right"))
        await createChallengeBtn.click();

        console.log("I was here");
        await createChallenge();
        // tags => write enter press
        // submit btn
    }
    catch(err){
        console.log(err);
    }
})();

// implicit ka matlab - agar findElement ko abhi nhn mila element, toh 10 sec ke baad vo dobara try karega
// pageload - hrr ek frontend framework pe bana hua hai, toh vo na ek fw use karta hai backbone.js, aur na usme kaafi saara frontend ke andar oracle load hota rehta hai...isliye pageLoad 10 sec ka laga rakha hai

// NOTE - async fn ka sara code try catch me aayega

async function createChallenge(){
    // await waitForLoader();
    // let problemStatementBox = await driver.findElement(swd.By.css("#problem_statement-container .CodeMirror textarea"));
    // await problemStatementBox.click();
    // await problemStatementBox.sendKeys("abc");

    let eLinkArr = ["#name", "textarea.description", "#problem_statement-container textarea", "#input_format-container textarea", "#constraints-container textarea", "#output_format-container textarea"];

    let elementsArrayPromise = eLinkArr.map(function(link){
        return driver.findElement(swd.By.css(link));
    })

    let elementsArray = await Promise.all(elementsArrayPromise);
    console.log(elementsArray.length);
    let dataSentPromise = elementsArray.map(function(element){
        return element.sendKeys("abc");
    })

    await Promise.all(dataSentPromise);
    console.log("Text has been added");

    // // challenge Name => id => #name
    // let challengeBoxPromise = driver.findElement(swd.By.css("#name"));
    // // description => textarea.description
    // let descBoxPromise = driver.findElement(swd.By.css("textarea.description"));
    // // problem statement => #problem_statement-container textarea
    // let problemStatementBoxPromise = driver.findElement(swd.By.css("#problem_statement-container textarea"));
    // // input format => #input_format-container textarea
    // let inputFormatBoxPromise = driver.findElement(swd.By.css("#input_format-container textarea"));
    // // constraints => #constraints-container textarea
    // let constraintsBoxPromise = driver.findElement(swd.By.css("#constraints-container textarea"));
    // // output format => #output_format-conatiner textarea
    // let outputFormatBoxPromise = driver.findElement(swd.By.css("#output_format-container textarea"));


}


async function waitForLoader(){
    let loader = await driver.findElement(swd.By.css("#ajax-msg"));
    await driver.wait(swd.until.elementIsNotVisible(loader));
}