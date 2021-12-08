const { readInputAsArray } = require("../lib/common");

const input = readInputAsArray("./day-3/input.txt").map((item) =>
  item.split("")
);

function rowToColumns(array) {
  return Object.keys(array[0]).map((columnIndex) =>
    array.map((row) => row[columnIndex])
  );
}

function countOccurrences(array, number) {
  return array.reduce((acc, curr) => (curr === number ? acc + 1 : acc), 0);
}

console.time("part 1");
const gammaArray = rowToColumns(input).map((a) => {
  return countOccurrences(a, "1") >= a.length / 2 ? 1 : 0;
});

const epsilonArray = gammaArray.map((n) => (n === 1 ? 0 : 1));

function arrayToDecimal(array) {
  return parseInt(array.join(""), 2);
}

console.log(
  "Part 1 Result →",
  arrayToDecimal(gammaArray) * arrayToDecimal(epsilonArray)
);
console.timeEnd("part 1");


/* Part 2 */

function getColumnByIndex(input, index) {
  return input.map((row) => row[index]);
}

function calcMostOccurrences(input, index) {
  return (countOccurrences(getColumnByIndex(input, index), '1') >= input.length / 2 ? 1 : 0).toString();
}

function calcLeastOccurrences(input, index) {
  return (countOccurrences(getColumnByIndex(input, index), '1') >= input.length / 2 ? 0 : 1).toString();
}

function processOxygenGeneratorRating(input, index = 0) {
  const mostNumbersValue = calcMostOccurrences(input, index).toString();
  const filteredArray = input.filter(row => row[index] === mostNumbersValue);
  index += 1;
  if (index === input[0].length) {
    return filteredArray.flat();
  }
  return processOxygenGeneratorRating(filteredArray, index);
}

function processScrubberRating(input, index = 0) {
  const leastNumbersValue = calcLeastOccurrences(input, index).toString();
  const filteredArray = input.filter(row => row[index] === leastNumbersValue);
  index += 1;
  if (index === input[0].length || filteredArray.length === 1 ) {
    return filteredArray.flat();
  }
  return processScrubberRating(filteredArray, index);
}

const oxygenGeneratorRating = arrayToDecimal(processOxygenGeneratorRating(input));

const scrubberRating = arrayToDecimal(processScrubberRating(input));

console.log('Part 2 Result →', oxygenGeneratorRating * scrubberRating)