let request = require("request");
let fs = require('fs');
let cheerio = require("cheerio");
console.log("Sending request");
let count = 0;
request("https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results", function(err, res, html){
    if(err == null & res.statusCode == 200){
        console.log("File received");

        fs.writeFileSync("series.html", html);
        console.log("File written to disk");
        parseHtml(html);
    }
    else if(res.statusCode == 404){
        console.log("Invalid URL");
    }
    else{
        console.log(err);
        console.log(res.statusCode);
    }
});
//function is a callback function here
// console.log("Extra work");

function parseHtml(html){
    //cheerio => html => data => html
    //cheerio takes html, and it finds and brings the required data from html page
    console.log("Parsing Html");
    let $ = cheerio.load(html);
    
    //cards nikale saare:
    // let cards = $(".card.content-block.league-scores-container .col-md-8.col-16");
    let cards = $(".match-score-block")
    console.log(cards.length);
    // let count = 0;
    for(let i=0; i<cards.length; i++){
        //text nikala saare cards ka:
        let text = $(cards[i]).find(".small.mb-0.match-description").text();
        // console.log(text);
        //cards filter kiye text ke basis pe aur unke links nikale:
        if(text.includes("T20I") == true || text.includes("ODI") == true){
            count++;
            
            //filtered cards => href
            let link = $(cards[i]).find(".match-cta-container a").attr("href");
            let completeLink = "https://www.espncricinfo.com" + link;
            console.log(completeLink);
            processRequest(completeLink);
        }
    }

    console.log(count);
}

function processRequest(completeLink){

    request(completeLink, function(err, res, html){
        if(err == null && res.statusCode == 200){
            fs.writeFileSync(`Match${count--}.html`, html);
            console.log(`Match ${count} file written`);
            handleMatch(html);
        }
        else if(res.statusCode == 404){
            console.log("404 page not found");
        }
        else{
            console.log(err);
            console.log(res.statusCode);
        }
    });
}

function handleMatch(html){
    // 1 match => player name, runs, team, format
    //table

}