// npm install -y
// npm install selenium-webdriver
// npm install chromedriver

let fs = require("fs");

let credentials = process.argv[2];
let un, pn;

// chromedriver
require("chromedriver");

// selenium
let swd = require('selenium-webdriver');

// builder => browser
let bldr = new swd.Builder();

// driver => 1 tab
let driver = bldr.forBrowser("chrome").build();

// let tabWillBeOpenedPromise = driver.get("https://google.com");
// let tabWillBeOpenedPromise = driver.get("https://pepcoding.com/login");
// tabWillBeOpenedPromise.then(function(){
//     console.log("Tab was successfully opened");
// });

let credentialWillBeReadPromise = fs.promises.readFile(credentials);
credentialWillBeReadPromise.then(function(content){
    let {userName, password} = JSON.parse(content);
    un = userName;
    pn = password;
}).then(function(){
    let tabWillBeOpenedPromise = driver.get("https://pepcoding.com/login");
    return tabWillBeOpenedPromise;
}).then(function(){
    console.log("Tab was successfully opened");
}).then(function(){
    //attribute selector => another type of selector
    //first occurences
    let emailWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=email]")); 
    return emailWillBeSelectedPromise;
}).then(function(emailElement){
    let emailTextPromise = emailElement.sendKeys(un);
    return emailTextPromise;
    //wait
}).then(function(){
    let passwordWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"));
    return passwordWillBeSelectedPromise;
}).then(function(passwordElement){
    // let passwordWillBeInputPromise = passwordElement.sendKeys("aaBraKaDaBra");
    let passwordWillBeInputPromise = passwordElement.sendKeys(pn);
    return passwordWillBeInputPromise;
}).then(function(){
    console.log("Email and Password enetered");
}).then(function(){
    let submitBtnWillBeSelectedPromise = driver.findElement(swd.By.css("button[type=submit]"));
    return submitBtnWillBeSelectedPromise;
}).then(function(submitBtn){
    let submitBtnWillBeClickedPromise = submitBtn.click();
    return submitBtnWillBeClickedPromise;
}).then(function(){
    console.log("User Logged In Successfully.");
}).catch(function(err){
    console.log(err);
});

// all then and catch will be run sequentially

// tabWillBeOpenedPromise.catch(function(err){
//     console.log(err);
// });

// NOTE: JAB BHI THEN KE BAAD THEN KE BAAD THEN CHALANA HOGA TOH HAMESHA EK PROMISE RETURN KARANA HOGA THEN KE ANDAR KE FUNCTION SE

console.log("I will be first");