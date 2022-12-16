require('dotenv').config();

// let NodeMode = true;
const envMode = process.env.NODE_ENV;

// if (envMode === 'production') {
//   console.log('Production Mode');
//   NodeMode = false;
// }

function info(...args) {
  if (envMode === 'development') {
    console.log('-------------------------------------------------------------------');
    console.log(...args);
  }
}
function ShowError(...args) {
  if (envMode === 'development') {
    console.log('-------------------------------------------------------------------');
    console.error(...args);
  }
}

module.exports = { info, ShowError };
