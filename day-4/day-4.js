const { readInput, rowToColumns } = require("../lib/common");

const fileInput = readInput("./day-4/input.txt").split("\n");

const input = [...fileInput];

const bingoNumbers = input.splice(0, 1)[0].split(",").map(Number);

const boardsInput = input
  .filter((v) => v)
  .map((s) => s.trim().replace(/\s{2}/g, " ").split(" ").map(Number));

const boards = [];

while (boardsInput.length > 0) {
  const board = boardsInput.splice(0, 5);
  boards.push([...board, ...rowToColumns(board)]);
}

function removeNumberOnBoard(bingoNumber, board) {
  for (let i = 0; i < board.length; i++) {
    const line = board[i];
    const matchedNumberIndex = line.indexOf(bingoNumber);
    if (matchedNumberIndex > -1) {
      line.splice(matchedNumberIndex, 1);
    }
  }
}

function findFirstWinner(bingoNumbers, boards) {
  for (let i = 0; i < bingoNumbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      removeNumberOnBoard(bingoNumbers[i], boards[j]);
      if (boards[j].some((line) => line.length === 0)) {
        return { bingoNumber: bingoNumbers[i], winningBoard: boards[j] };
      }
    }
  }
}

function findLastWinner(bingoNumbers, boards) {
  const winningBoards = new Set();
  for (let i = 0; i < bingoNumbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      removeNumberOnBoard(bingoNumbers[i], boards[j]);
      if (boards[j].some((line) => line.length === 0)) {
        winningBoards.add(boards[j]);
      }
      if (winningBoards.size === boards.length) {
        return { bingoNumber: bingoNumbers[i], winningBoard: boards[j] }
      }
    }
  }
}

function calculateBoardSum(board) {
  const noDupeValues = [...new Set(board.flat())];
  return noDupeValues.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
};

function calculateScore(bingoNumbers, boards, findWinner) {
  const { bingoNumber, winningBoard } = findWinner(bingoNumbers, boards);
  return bingoNumber * calculateBoardSum(winningBoard);
}

console.log('Part 1 Result →', calculateScore(bingoNumbers, boards, findFirstWinner));
console.log('Part 2 Result →', calculateScore(bingoNumbers, boards, findLastWinner));
