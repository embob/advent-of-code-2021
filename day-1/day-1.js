const { readInputAsNumberArray } = require("../lib/common");

const input = readInputAsNumberArray("./day-1/input.txt");

function countIncreases(input) {
  return input.reduce((acc, curr, index, array) => {
    if (curr < array[index + 1]) {
      acc += 1;
    }
    return acc;
  }, 0);
}

/* Day 1 */

const result = countIncreases(input);

console.log("Part 1", result);

/* Day 2 */

const slidingWindowArray = input.map((item, index, array) => {
  return item + array[index + 1] + array[index + 2];
}).filter((item) => item === 0 || item);

const result2 = countIncreases(slidingWindowArray);

console.log("Part 2", result2);