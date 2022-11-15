require('dotenv').config()

var NodeMode=true;
const envMode = process.env.NODE_ENV

if(envMode === 'production'){
    console.log('Production Mode')
    NodeMode = false
}

function info(...arguments){
    NodeMode? console.log(...arguments):''
}
function ShowError(...arguments){
    NodeMode? console.error(...arguments):''
}

module.exports = {info,ShowError}