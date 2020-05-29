//Runs scored by every player in complete series including only T20I and ODI

let request = require("request");
let fs = require('fs');
let cheerio = require("cheerio");
console.log("Sending request");
let count = 0;
let leaderBoard = [];
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
            // fs.writeFileSync(`Match${count--}.html`, html);
            // console.log(`Match ${count} file written`);
            handleMatch(html);
            count--;
            
            // sort => leaderBoard => objects
            // objects =>
            // key => greater, smaller
            // car => mileage, speed, price
            // [a,b,c,d]

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            function kaunBadhaKaunChhota(a, b){
                if(a.Runs > b.Runs){
                    return -1;      // a has higher priority => sort a to an index lower than b (i.e, a comes first)
                }
                else if(a.Runs < b.Runs){
                    return +1;      // b has higher priority => sort b to an index lower than a (i.e, b comes first)
                }
                else{
                    return 0;       // Both have same priority. Leave a and b unchanged with respect to each other, but sorted with respect to all different elements
                }
            }
            
            let sortedLeaderBoardArray = leaderBoard.sort(kaunBadhaKaunChhota);

            //all matches have been processed
            if(count == 0){
                console.table(sortedLeaderBoardArray);
            }
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
    // console.log("Parsing Html");

    let $ = cheerio.load(html);
    let text = $(".desc.text-truncate").text();
    console.log(text);

    //zaroori nhn hai harr baar sab same hi order me aayein - reason is async programming
    let format = text.includes("T20I") == true ? "T20I" : "ODI";
    console.log("Format: " + format);
    console.log();


    // let innings = $(".header-title.label");
    // let innings = $(".row.no-gutters.align-items-center");
    let innings = $(".card.content-block.match-scorecard-table .Collapsible");
    for(let i=0; i<innings.length; i++){
        // let team = $(innings[i]).find("h5").text().split(" (")[0];
        let team = $(innings[i]).find("h5").text().split(" Innings")[0];
        // console.log($(innings[i]).find("h5").text());
        // let batsman = $(innings[i]).find(".batsman-cell.text-truncate");
        // let batsman_names = $(innings[i]).find(".batsman-cell.text-truncate");
        // let batsman_runs = $(innings[i]).find(".font-weight-bold");
        
        // for(let brow=0; brow<batsman_names.length; brow++){
        //     let name = $(batsman_names[brow]).text();
        //     let runs = $(batsman_runs[brow]).text();
        //     console.log(name + " " + runs);
        // }

        // console.log(inningName + " " + batsman_names.length);
        console.log("Team Name: " + team);

        let battingTable = $(innings[i]).find("table.batsman");

        let players = battingTable.find("tbody tr");
        // let playerRuns = battingTable.find("tbody tr td .font-weight-bold");

        // console.log(players);
        for(let i=0; i<players.length; i++){
            // console.log($(players[i]).text());
            let name = $(players[i]).find(".batsman-cell.text-truncate").text();
            let runs = $(players[i]).find(".font-weight-bold").text();
            if(name.length != 0){
                console.log(name + " " + runs);
                handlePlayer(format, team, name, runs);
            }
        }
        console.log("######################");
        // let players = $($(innings[i]).find("table.batsman tbody tr")[1]);
        // let runs = $($(innings[i]).find());
    }
    console.log("**************************************");
}

// document.querySelector("#main-container > div > div > div.match-body > div.match-scorecard-page > div:nth-child(1) > div:nth-child(1) > div > div > div > div > table.table.batsman > tbody > tr:nth-child(13) > td.font-weight-bold")
// document.querySelector("#main-container > div > div > div.match-body > div.match-scorecard-page > div:nth-child(1) > div:nth-child(1) > div > span > div > div > div.col > h5")
// #main-container > div > div > div.match-body > div.match-scorecard-page > div:nth-child(1) > div:nth-child(1) > div > span > div > div > div.col > h5

function handlePlayer(format, team, name, runs){
    runs = Number.parseInt(runs, 10);

    for(let i=0; i<leaderBoard.length; i++){
        if(leaderBoard[i].Name == name && leaderBoard[i].Format == format && leaderBoard[i].Team == team){
            leaderBoard[i].Runs += runs;
            return;
        }
    }

    //player object
    let po = {
        Name: name,
        Team: team,
        Format: format,
        Runs: runs
    }
    leaderBoard.push(po);
}