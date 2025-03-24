const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

const array = input[0]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
//특성값이 0에 가까운 혼합 용액을 만들어야한다.

let i = 0;
let j = array.length - 1;

let tempAnswer = Infinity;
let answer = [];

while (i < j) {
  let sum = array[i] + array[j];

  if (tempAnswer > Math.abs(sum)) {
    tempAnswer = Math.abs(sum);
    answer = [array[i], array[j]];
  }

  if (sum > 0) {
    j--;
  } else if (sum < 0) {
    i++;
  } else {
    break;
  }
}

console.log(answer.sort((a, b) => a - b).join("\n"));
