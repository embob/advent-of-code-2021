const { ChildProcess } = require("child_process");
const { readInputAsArray } = require("../lib/common");

const input = readInputAsArray("./day-2/input.txt");

const inputToArrays = input.map(item => item.split(' '));

function sumHorizontalAndDepth(inputToArrays) {
  const positions = inputToArrays.reduce((acc, curr) => {
    if (curr[0] === 'up') {
      acc.depth -= Number(curr[1]);
    }
    if (curr[0] === 'down') {
      acc.depth += Number(curr[1]);
    }
    if (curr[0] === 'forward') {
      acc.horizontal += Number(curr[1]);
    }
    return acc;
  }, { horizontal: 0, depth: 0});
  return positions.horizontal * positions.depth;
}

// Todo: use an object to store the condition as the key and the calculation as the value
  // const direction = {
  //     'up' : (parameters) => depth minus amount
  //     'down' : (parameters) => depth plus amount
  //     etc
  // }

console.log('Result', sumHorizontalAndDepth(inputToArrays));