// Last bowl commentary

let request = require("request");
let fs = require('fs');
let cheerio = require("cheerio");
console.log("Sending request");
request("https://www.espncricinfo.com/series/19322/commentary/1187677/new-zealand-vs-india-1st-t20i-india-in-new-zealand-2019-20", function(err, res, html){
    if(err == null & res.statusCode == 200){
        console.log("File received");

        fs.writeFileSync("main.html", html);
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
    //cheerio takes html, and it finds and brings/extracts the required data from html page
    console.log("Parsing Html");
    let $ = cheerio.load(html);
    // let data = $("#header-wrapper > div:nth-child(1) > div > div > div > nav > div > a").text();
    // let data = $("#main-container > div > div > div.card.home-score-card > div.match-header > div.event > div.teams > div:nth-child(2) > div:nth-child(1) > a > span").text();
    // let data = $("#main-container > div > div > div.match-body > div.comment-container > div.mb-5 > div > div:nth-child(1) > div.match-comment > div:nth-child(1) > div.match-comment-over-end > div.comment-over-end-head > div.col-6.col-md-6.col-lg-7.comment-over-end-head-lhs > span.comment-over-end-caps.text-uppercase").text();
    // let data = $("#main-container > div > div > div.match-body > div.comment-container > div.mb-5 > div > div:nth-child(1) > div.match-comment > div:nth-child(1) > div.match-comment-over-end > div.comment-over-end-head > div.col-10.col-md-10.col-lg-7.comment-over-end-head-rhs").text();
    // let data = $("#main-container > div > div > div.card.home-score-card > div.match-header > div.event > div.event-header.d-block > div:nth-child(1)").text();
    // let data = $("#main-container > div > div > div.card.home-score-card > div.match-header > div.event > div.event-header.d-block > div:nth-child(1) > span").text();
    // let data = $("#main-container  div  div  div.card.home-score-card  div.match-header  div.event  div.event-header.d-block  div.desc.text-truncate").text();
    // let data = $("#header-wrapper  div:nth-child(2)  nav  ul  li:nth-child(1)  a  div  span").text();
    // let data = $("#main-container  div  div  div.card.home-score-card  div.match-header  div.event  div.teams  div:nth-child(2)  div:nth-child(2)  div.score-extra-score").text();
    // let data = $("#header-wrapper  div:nth-child(1)  div  div  div  nav  div  span").text();
    let data = $("#main-container  div  div  div.match-body  div.comment-container  div.mb-5  div  div:nth-child(1)  div.match-comment  div:nth-child(2) div");
    // let lbc = data.find(".match-comment-long-text.match-comment-padder").length;
    // let data = $("#main-container  div  div  div.match-body  div.comment-container  div.mb-5  div  div:nth-child(1)  div.match-comment  div:nth-child(2)  div div span").text();
    // let data = $("#main-container  div  div  div.match-body  div.comment-container  div.mb-5  div  div:nth-child(1)  div.match-comment  div:nth-child(2)  div").length;
    // let data = $("#main-container  div  div  div.card.home-score-card  div.match-header  div.event  div.teams  div:nth-child(2)  div:nth-child(1)  a  span").text();
    // let data = $("#main-container  div  div  div.match-body  div.comment-container  div.mb-5 > div  div:nth-child(1)  div.match-comment  div:nth-child(2)  div  span  p:nth-child(2)").text();
    console.log("*********************************");
    // console.log(data)
    // console.log(lbc);
    for(let i=0; i<data.length; i++)
        console.log($(data[i]).text());
}
// document.querySelector()
