const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

//n이 5일거라 가정
const n = +input.shift();

//첫 번째 배열은 오름차순
let A = input[0]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

//두 번째 배열은 내림차순
let B = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => b - a);

let result = 0;

A.forEach((val, idx) => {
  result += val * B[idx];
});

console.log(result);
