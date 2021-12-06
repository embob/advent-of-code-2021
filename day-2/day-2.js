const { readInputAsArray } = require("../lib/common");

const input = readInputAsArray("./day-2/input.txt");

/* PART 1 - first attempt */

// const inputToArrays = input.map(item => item.split(' '));

// function sumHorizontalAndDepth(inputToArrays) {
//   const positions = inputToArrays.reduce((acc, curr) => {
//     if (curr[0] === 'up') {
//       acc.depth -= Number(curr[1]);
//     }
//     if (curr[0] === 'down') {
//       acc.depth += Number(curr[1]);
//     }
//     if (curr[0] === 'forward') {
//       acc.horizontal += Number(curr[1]);
//     }
//     return acc;
//   }, { horizontal: 0, depth: 0});
//   return positions.horizontal * positions.depth;
// }

// console.log('Result', sumHorizontalAndDepth(inputToArrays));

/* PART 1 - refactored + PART 2 */

const directions = {
  up: (amount, {horizontal, depth}) => ({ horizontal, depth: depth - amount}),
  down: (amount, {horizontal, depth}) => ({ horizontal, depth: depth + amount}),
  forward: (amount, {horizontal, depth}) => ({ horizontal: horizontal + amount, depth}),
};

const directions2 = {
  up: (amount, {horizontal, depth, aim}) => ({ horizontal, depth, aim: aim - amount}),
  down: (amount, {horizontal, depth, aim}) => ({ horizontal, depth, aim: aim + amount}),
  forward: (amount, {horizontal, depth, aim}) => ({ horizontal: horizontal + amount, depth: depth + (aim * amount), aim }),
};

function calculatePositions(directions) {
  return input.reduce((acc, curr) => {
    const [direction, amount] = curr.split(' ');
    return directions[direction](Number(amount), acc);
  }, { horizontal: 0, depth: 0, aim: 0 });
}

const { horizontal, depth } = calculatePositions(directions);

const { horizontal: horizontal2, depth: depth2 } = calculatePositions(directions2);

console.log('Part 1 result →', horizontal * depth); // 1813801
console.log('Part 2 result →', horizontal2 * depth2);
