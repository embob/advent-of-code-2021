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

// Part 2


function something(input, index) {
  return input.map((row) => row[index]);
}

function processMostOccurrences(input, index) {
  return (countOccurrences(something(input, index), '1') >= input.length / 2 ? 1 : 0).toString();
}

function processLeastOccurrences(input, index) {
  return (countOccurrences(something(input, index), '1') >= input.length / 2 ? 0 : 1).toString();
}

function processOxygenGeneratorRating(input, index = 0) {
  const mostValue = processMostOccurrences(input, index).toString();
  const filteredArray = input.filter(row => row[index] === mostValue);
  index += 1;
  if (index === input[0].length) {
    return filteredArray.flat();
  }
  return processOxygenGeneratorRating(filteredArray, index);
}

function processScrubberRating(input, index = 0) {
  const leastValue = processLeastOccurrences(input, index).toString();
  const filteredArray = input.filter(row => row[index] === leastValue);
  index += 1;
  // console.log(filteredArray);
  if (index === input[0].length || filteredArray.length === 1 ) {
    return filteredArray.flat();
  }
  return processScrubberRating(filteredArray, index);
}


const oxygenGeneratorRating = arrayToDecimal(processOxygenGeneratorRating(input));

const scrubberRating = arrayToDecimal(processScrubberRating(input));

console.log('Part 2 Result →', oxygenGeneratorRating * scrubberRating)


// const mostCommonValues = rowToColumns(input).map((a) => {
//   return countOccurrences(a, "1") >= a.length / 2 ? 1 : 0;
// }).map((i) => i.toString());
// console.log("mostCommonValues", mostCommonValues);

// const leastCommonValues = rowToColumns(input).map((a) => {
//   return countOccurrences(a, "0") <= a.length / 2 ? 0 : 1;
// }).map((i) => i.toString());
// console.log("leastCommonValues , leastCommonValues", leastCommonValues);

// function calcRatingValue(valuesToFilterOut, inputArrays = [...input]) {
//   for (let i = 0; i < valuesToFilterOut.length; i++) {
//     const valueToCheck = valuesToFilterOut[i];
//     for (let j = inputArrays.length - 1; j >= 0; j--) {
//       const rowIndexValue = inputArrays[j][i];
//       if (rowIndexValue !== valueToCheck) {
//         inputArrays.splice(j, 1);
//       }
//       if (inputArrays.length === 1) return inputArrays;
//     }
//   }
//   return inputArrays;
// }

// const oxygenGeneratorRating = calcRatingValue(mostCommonValues);
// console.log("oxygenGeneratorRating", oxygenGeneratorRating);
// const scrubberRating = calcRatingValue(leastCommonValues);
// console.log("co2ScrubberRating", scrubberRating);

// const oD = arrayToDecimal(oxygenGeneratorRating.flat());
// const sD = arrayToDecimal(scrubberRating.flat());
// console.log('oD', oD);
// console.log('sD', sD);
