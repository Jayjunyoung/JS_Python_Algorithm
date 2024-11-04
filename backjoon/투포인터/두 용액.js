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
//array 배열의 길이는 5를 의미
let j = array.length - 1;
//이거 생각 못함
let tempSum = Infinity;
//Number.MAX_SAFE_INTEGER
let answer = [];
//초기 값 : 빈 배열

//while문에서 막힘

while (i < j) {
  let sum = array[i] + array[j];

  if (tempSum > Math.abs(sum)) {
    tempSum = Math.abs(sum);
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
