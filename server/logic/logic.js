/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const { info } = require('../utils/logger');

function coordinateValue(arr, a, b) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    if (arr[i][0] === a) {
      for (let j = 0; j < arr[0].length; j++) {
        if (arr[0][j] === b) {
          return arr[i][j];
        }
      }
    }
  }
  return false;
}
function addValues(ans, newarr, query) {
  console.log('incomming newArr', newarr);
  newarr.forEach((ele) => {
    info('ele ->', ele);
    const name = ele[0][0];
    let amt = ele[1];
    const borrowers = ele[2];
    const borrLen = borrowers.length;
    amt = parseFloat((amt / borrLen).toFixed(2));
    for (let i = 1; i < ans[0].length; i++) {
      if (ans[i][0] === name) {
        borrowers.forEach((eleB) => {
          info('Element: ', eleB);
          for (let j = 1; j <= ans[0].length; j++) {
            if (ans[0][j] === eleB) {
              ans[i][j] += amt;
            }
          }
        });
      }
    }
  });
  info('prevArr', ans);
  const ansArr = [];
  for (let i = 1; i < ans[0].length; i++) {
    const result = coordinateValue(ans, ans[0][i], query) - coordinateValue(ans, query, ans[0][i]);
    info(result);
    if (result !== 0) {
      const obj = {
        action: result < 0,
        amount: Math.abs(result),
        to: ans[0][i],
      };
      ansArr.push(obj);
    }
  }
  info('Answer Array', ansArr);
  return ansArr;
}
function makeUnfilledArray(newarr, query, members) {
  console.log('Members -> ', members);
  const ans = [['.', ...members]];
  const len = members.length;

  info('set of users:', members);

  members.forEach((ele) => {
    const t = new Array(len).fill(0);
    ans.push([ele, ...t]);
  });

  return addValues(ans, newarr, query);
}
function solve(arr, query, members) {
  const transformedArr = arr.map(({ paidBy, amount, paidTo }) => [paidBy.map((e) => e._id.toString()), parseInt(amount, 10), paidTo.map((e) => e._id.toString())]);
  return makeUnfilledArray(transformedArr, query, members);
}

module.exports = solve;
