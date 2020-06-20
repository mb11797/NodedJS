// npm install -y
// npm install selenium-webdriver
// npm install chromedriver

let fs = require("fs");
let path = require("path");

let credentials = process.argv[2];
let metadata = process.argv[3];
let courseName = process.argv[4];
let un, pn;
let gce;            //global course element 
let gCode;          //global code element
let gCodeArea;      //global code area element for editor
let gTextArea;      //global text area
// chromedriver
require("chromedriver");

// selenium
let swd = require('selenium-webdriver');
const { resolve } = require("path");
const { rejects } = require("assert");

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
    let passwordWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"));
    //for parallel work
    let combinedPromise = Promise.all([emailWillBeSelectedPromise, passwordWillBeSelectedPromise]);
    return combinedPromise;
}).then(function(elements){
    let emailWillBeInputPromise = elements[0].sendKeys(un);
    let passwordWillBeInputPromise = elements[1].sendKeys(pn);
    //for parallel work
    let combinedPromise = Promise.all([emailWillBeInputPromise, passwordWillBeInputPromise]);
    return combinedPromise;
    //wait
}).then(function(){
    console.log("Email and Password are enetered");
}).then(function(){
    let submitBtnWillBeSelectedPromise = driver.findElement(swd.By.css("button[type=submit]"));
    return submitBtnWillBeSelectedPromise;
}).then(function(submitBtn){
    let submitBtnWillBeClickedPromise = submitBtn.click();
    return submitBtnWillBeClickedPromise;
}).then(function(){
    console.log("User Logged In Successfully.");
}).then(function(){
    let coursePageURLPromise = driver.get("https://www.pepcoding.com/resources/");
    return coursePageURLPromise;
}).then(function(){
    console.log("Opened courses page.");
}).then(overlayWillBeDismissedPromise)
.then(function(){
    let cardElementWillBeSelectedPromise = driver.findElements(swd.By.css(".card-image h2"));
    return cardElementWillBeSelectedPromise;
}).then(function(elements){
    gce = elements;
    //extract name of the courses
    let tPromisesArray = [];
    for(let i=0; i<elements.length; i++){
        let elementTextPromise = elements[i].getText();
        tPromisesArray.push(elementTextPromise);
    }
    return Promise.all(tPromisesArray);
}).then(function(elementsText){
    let i;
    for(i=0; i<elementsText.length; i++){
        if(courseName == elementsText[i]){
            break;
        }
    }
    let courseWillBeClickedPromise = gce[i].click();
    return courseWillBeClickedPromise;
}).then(function(){
    console.log("Reached Inside our Course.");
}).then(function(){
    // read metadata.json file
    let fileReadPromise = fs.promises.readFile(metadata);
    return fileReadPromise;
}).then(function(content){
    let questions = JSON.parse(content);
    let questionWillBeSolvedPromise = solveQuestion(questions[0]);
    return questionWillBeSolvedPromise;
}).then(function(){
    console.log("Question has been submitted.");
})


.catch(function(err){
    console.log(err);
});

// all then will and catch will be run sequentially

// tabWillBeOpenedPromise.catch(function(err){
//     console.log(err);
// });

// NOTE: JAB BHI THEN KE BAAD THEN KE BAAD THEN CHALANA HOGA TOH HAMESHA EK PROMISE RETURN KARANA HOGA THEN KE ANDAR KE FUNCTION SE

console.log("I will be first");

//ABSTRACTION AND PATIENCE



//problem submit, test case download
function solveQuestion(question){
    return new Promise(function(resolve, reject){
        let qPageWillBeOpenedPromise = goToQuestionPage(question);
        qPageWillBeOpenedPromise.then(overlayWillBeDismissedPromise).then(function(){
            let editorTabWillBeSelectedPromise = driver.findElement(swd.By.css(".tab.bold.editorTab"));
            return editorTabWillBeSelectedPromise;
        }).then(function(editorTab){
            let editorTabWillBeClickedPromise = editorTab.click();
            return editorTabWillBeClickedPromise;
        }).then(function(){
            console.log("Question Page is Opened");
        }).then(function(){
            let fileReadPromise = fs.promises.readFile(path.join(question.path, "Main.java"));
            return fileReadPromise;
        }).then(function(code){
            gCode = code + "";
            let codeAreaWillBeSelectedPromise = driver.findElement(swd.By.css(".ace_text-input"));
            return codeAreaWillBeSelectedPromise;
        }).then(function(codeArea){
            gCodeArea = codeArea;
            let ctrlAWillBePressedPromise = codeArea.sendKeys(swd.Key.CONTROL + "a");
            return ctrlAWillBePressedPromise;
        }).then(function(){
            let deleteWillBePressedPromise = gCodeArea.sendKeys(swd.Key.DELETE);
            // let deleteWillBePressedPromise = gCodeArea.sendKeys(swd.Key.BACK_SPACE);
            return deleteWillBePressedPromise;
        }).then(function(){
            let textAreaWillBeSelectedPromise = driver.findElement(swd.By.css("#customInput"));         //id ke liye (#) aur class ke liye (.) use karna hota hai
            return textAreaWillBeSelectedPromise;
        }).then(function(textArea){
            gTextArea = textArea;
            let codeWillBeSentPromise = gTextArea.sendKeys(gCode);
            return codeWillBeSentPromise;
        }).then(function(){
            let ctrlAWillBePressedPromise = gTextArea.sendKeys(swd.Key.CONTROL + "a");
            return ctrlAWillBePressedPromise;
        }).then(function(){
            let ctrlXPromise = gTextArea.sendKeys(swd.Key.CONTROL + "x");
            return ctrlXPromise;
        }).then(function(){
            let ctrlVPromise = gCodeArea.sendKeys(swd.Key.CONTROL + "v");
            return ctrlVPromise;
        }).then(function(){
            let submitBtnWilBeSelectedPromise = driver.findElement(swd.By.css("#submitCode"));
            return submitBtnWilBeSelectedPromise;
        }).then(function(submitBtn){
            let submitBtnWillBeClickedPromise = submitBtn.click();
            return submitBtnWillBeClickedPromise;
        }).then(overlayWillBeDismissedPromise)        
        .then(function(){
            const testCasesWillBeSelectedPromise = driver.findElements(swd.By.css(".collection-item"));
            return testCasesWillBeSelectedPromise;
            // /test cases download => test cases element => 5
        }).then(function(testCasesElements){
            let inputsPromises = testCasesElements.map(function(testCaseElement){
                return testCaseElement.findElements(swd.By.css("input[type=hidden]"));
            })
            return Promise.all(inputsPromises);
        }).then(function(inputElements){
            let inputValPromiseArray = inputElements.map(function(ie){
                let input = ie[0].getAttribute("value");
                let expected = ie[1].getAttribute("value");
                let actual = ie[2].getAttribute("value");
                // 1 particular => row => 1 Promise
                return Promise.all([input, expected, actual]);
            })
            //all rows => resolved
            return Promise.all(inputValPromiseArray);
        }).then(function(inputTestCasesVal){
            // 2d array
            let objArray = inputTestCasesVal.map(function(row){
                let obj = {};
                obj.input = row[0];
                obj.expected = row[1];
                obj.actual = row[2];
                return obj;
            })
            let testCaseFileWillBeWrittenPromise = fs.promises.writeFile(path.join(question.path, "tc.json"), JSON.stringify(objArray));
            return testCaseFileWillBeWrittenPromise;
        })
        
        // read question from metadata.json file
        // 1. copy the code to editor
        // 2. submit the code
        // 3. download testcases
        .then(function(){
            resolve();
        })
        .catch(function(err){
            reject(err);
        })
    })
}

function goToQuestionPage(question){
    return new Promise(function(resolve, reject){
        let qUrlWillBeOpenedPromise = driver.get(question.url);
        qUrlWillBeOpenedPromise.then(function(){
            let payCoinsBtnWillBeSelected = driver.findElement(swd.By.css(".btn.waves-effect.waves-light.col.s4.l1.push-s4.push-l5"))
            return payCoinsBtnWillBeSelected;
            // resolve();
        }).then(function(coinsBtn){
            let coinsWillBePaidPromise = coinsBtn.click();
            return coinsWillBePaidPromise;
        }).then(function(){
            console.log("Coins have been paid.");
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}

// Logic => promise => allow wait overlay dismiss
function overlayWillBeDismissedPromise(){
    return new Promise(function(resolve, reject){
        let siteOverlayWillBeFoundPromise = driver.findElement(swd.By.css("#siteOverlay"));
        siteOverlayWillBeFoundPromise.then(function(soe){
            let willWaitForOverlayPromise = driver.wait(swd.until.elementIsNotVisible(soe));
            return willWaitForOverlayPromise;
        }).then(function(){
            resolve();
        }).catch(function(err){
            rejects(err);
        })
    })
}