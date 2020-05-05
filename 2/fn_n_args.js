//JS emulates things
//these are not actual args, rather dummy args, so that this language appears like other languages
//arguments array (inbuilt) - actual source of truth

function myfn(whatToSay){
    // console.log(whatToSay);
    console.log(arguments);
    console.log("'''''''''''''''''''''");
}

myfn("Hi All!");
myfn();
myfn("Hi All!", "another program");