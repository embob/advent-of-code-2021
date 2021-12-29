const { readInputAsArray } = require("../lib/common");

const input = readInputAsArray("./day-5/input.txt")
  .map((item) => item.split(" -> "))
  .map((item) => {
    const [start, end] = item;
    const formatNumbers = (coords) => coords.split(",").map(Number);
    const startCoords = formatNumbers(start);
    const endCoords = formatNumbers(end);
    return {
      start: { x: startCoords[0], y: startCoords[1] },
      end: { x: endCoords[0], y: endCoords[1] },
    };
  });

const isHorizontal = (line) => line.start.y === line.end.y;
const isVertical = (line) => line.start.x === line.end.x;

const horizOrVert = input.filter(
  (line) => isHorizontal(line) || isVertical(line)
);

function plotHorizontalLine(line) {
  const start = line.start.x > line.end.x ? line.end.x : line.start.x;
  const end = line.start.x > line.end.x ? line.start.x : line.end.x;
  const points = [];
  for (let index = start; index <= end; index++) {
    points.push(`${index}, ${line.end.y}`);
  }
  return points;
}

function plotVerticalLine(line) {
  const start = line.start.y > line.end.y ? line.end.y : line.start.y;
  const end = line.start.y > line.end.y ? line.start.y : line.end.y;
  const points = [];
  for (let index = start; index <= end; index++) {
    points.push(`${line.start.x}, ${index}`);
  }
  return points;
}

function plotLines(horizOrVert) {
  const horizontalPoints = horizOrVert
    .filter(isHorizontal)
    .map(plotHorizontalLine)
    .flat();
  const verticalPoints = horizOrVert
    .filter(isVertical)
    .map(plotVerticalLine)
    .flat();
  const allPoints = [...horizontalPoints, ...verticalPoints]
    .reduce((acc, curr) => {
      if (!acc[curr]) acc[curr] = 0;
      acc[curr] += 1;
      return acc;
    }, {});
    return Object.values(allPoints).filter(point => point > 1).length;
}

console.log(plotLines(horizOrVert));
