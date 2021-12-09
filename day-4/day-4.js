const { readInput, rowToColumns } = require("../lib/common");

const fileInput = readInput("./day-4/input.txt").split('\n');

// console.log(fileInput);

const input = [...fileInput];

const bingoNumbers = input.splice(0, 1)[0].split(',').map(Number);

const boardsInput = input.filter(v => v)
  .map(s => s.trim().replace(/\s{2}/g, ' ')
  .split(' ')
  .map(Number));

const boards = [];
while(boardsInput.length > 0) {
  const board = boardsInput.splice(0, 5);
  boards.push([...board, ...rowToColumns(board)]);
}

function removeNumberOnBoard(bingoNumber, board) {
  for (let i = 0; i < board.length; i++) {
    const matchIndex = board[i].indexOf(bingoNumber);
    if (matchIndex > -1) {
      board[i].splice(matchIndex, 1);
    }
  }
}

console.log(removeNumberOnBoard(bingoNumbers[0], boards[0]));

console.log(boards);