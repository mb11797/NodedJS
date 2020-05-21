let request = require("request");
let fs = require('fs');
let cheerio = require("cheerio");
console.log("Sending request");
request("https://www.espncricinfo.com/series/19322/scorecard/1187677/new-zealand-vs-india-1st-t20i-india-in-new-zealand-2019-20", function(err, res, html){
    if(err == null & res.statusCode == 200){
        console.log("File received");

        fs.writeFileSync("scorecard.html", html);
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

function parseHtml(data){
    //cheerio => html => data => html
    //cheerio takes html, and it finds and brings the required data from html page
    console.log("Parsing Html");
    let $ = cheerio.load(data);
    // let bowling_tables = $(".Collapsible__contentOuter.table.bowler").text();
    // let bowling_tables = $("#main-container  div  div  div.match-body  div.match-scorecard-page  div:nth-child(1)  div:nth-child(1)  div  div  div  div  table.table.bowler");
    // let bowlingTables = $(".match-scorecard-page .Collapsible .table.bowler");
    let bowlingTables = $(".card.content-block.match-scorecard-table .Collapsible__contentInner");
    // let bowlingTables = $(".table.bowler");
    // console.log(bowlingTables.length);
    // let html="";
    // for(let i=0;i<bowlingTables.length;i++ ){
    //     html+=$(bowlingTables[i]).html();
    // }
    console.log("*********************************");
    // let players = bowlingTables.find("table tbody tr");
    let players = bowlingTables.find("table.bowler tbody tr");

    //highest wicket taker
    let maxm = Number.MIN_SAFE_INTEGER;
    let hwt = "";
    for(let i=0; i<players.length; i++){
        // console.log($(players[i]).text());
        let name = $($(players[i]).find("td")[0]).text();
        let wickets = $($(players[i]).find("td")[4]).text();
        if(wickets>maxm){
            hwt = name;
            maxm = wickets;
        }

        console.log(name + " " + wickets);
    }
    console.log("*********************************");

    console.log("Highest Wicket Taker: ");
    console.log(hwt + " " + maxm);

    // let bowlingTables = $("#main-container  div  div  div.match-body  div.match-scorecard-page  div:nth-child(1)  div:nth-child(1)  div  div  div  div  table.table.bowler");
    // fs.writeFileSync("bowlingCards.html", html);
    console.log("*********************************");
}

// document.querySelector("#main-container > div > div > div.match-body > div.match-scorecard-page > div:nth-child(1) > div:nth-child(1) > div > div > div > div > table.table.bowler")

// #main-container > div > div > div.match-body > div.match-scorecard-page > div:nth-child(1) > div:nth-child(1) > div > div > div