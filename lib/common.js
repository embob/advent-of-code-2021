const fs = require("fs");

function readInput(path) {
  return fs.readFileSync(path).toString();
}

function readInputAsArray(path) {
  return readInput(path).split("\n");
}

function readInputAsNumberArray(path) {
  return readInputAsArray(path).map(Number);
}

function rowToColumns(array) {
  return Object.keys(array[0]).map((columnIndex) =>
    array.map((row) => row[columnIndex])
  );
}

module.exports = {
  readInput,
  readInputAsArray,
  readInputAsNumberArray,
  rowToColumns,
};
