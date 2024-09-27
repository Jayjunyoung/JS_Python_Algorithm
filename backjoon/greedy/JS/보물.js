const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

//n이 5일거라 가정
const n = +input.shift();

let A = input[0]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
let B = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => b - a);

let result = 0;

A.forEach((val, idx) => {
  result += val * B[idx];
});

console.log(result);
