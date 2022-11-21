/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

/** make markov machine text */
function generateText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());

}

/** read file and make text */

function makeText(path){
    fs.readFile(path, "utf8", function cb(e, data){
        if (e){
            console.error(`Cannot read file: ${path}: ${e}`);
            process.exit(1);
        }
        else{
            generateText(data);
        }
    });
}

/** read and make text from URL */

async function makeURLText(url){
    let res;
    try {
        res = await axios.get(url);
    }
    catch(e){
        console.error(`Cannot read URL: ${url} ${e}`);
        process.exit(1);
    }
    generateText(res.data);
}

/** from terminal choose funcion */
let [method, path] = process.argv.slice(2);

if (method === "file"){
    makeText(path);
}
else if (method === "url"){
    makeURLText(path);
}
else{
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}