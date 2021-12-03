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

module.exports = { readInput, readInputAsArray, readInputAsNumberArray };
