const [in1, ...in2] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

//타이핑 하면서 공부
const [n, m] = in1.split(" ").map(Number);
const board = in2.map((row) => row.split(" ").map(Number));
const polyomino = [
  // box
  [
    [1, 1],
    [1, 1],
  ],
  // bar
  [[1, 1, 1, 1]],
  [[1], [1], [1], [1]],
  // T
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [0, 1],
  ],
  // thunder
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
  [
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  // L
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    [1, 1],
    [0, 1],
    [0, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [1, 1],
    [1, 0],
    [1, 0],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
  ],
];

const calcArea = (shape, w, h, rowNum, colNum) => {
  let area = 0;
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      area += board[i + rowNum][j + colNum] * shape[i][j];
    }
  }
  return area;
};

const getMax = (shape, width, height) => {
  let max = 0;
  for (let i = 0; i < n - width + 1; i++) {
    for (let j = 0; j < m - height + 1; j++) {
      max = Math.max(max, calcArea(shape, width, height, i, j));
    }
  }
  return max;
};

const solution = () => {
  let answer = 0;
  for (let shape of polyomino) {
    const [wSize, hSize] = [shape.length, shape[0].length];
    answer = Math.max(answer, getMax(shape, wSize, hSize));
  }
  return answer;
};

console.log(solution());
