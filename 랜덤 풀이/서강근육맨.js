const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

const muscleLost = input[0].split(" ").map(BigInt);
console.log(muscleLost);
//BigInt 자료형으로 접근했어야돼.
//근 손실 정도 데이터가 10^18임
let answer = 0n;

muscleLost.sort((a, b) => (a < b ? -1 : 1));

if (muscleLost.length % 2 === 1) {
  answer = muscleLost.pop();
}

for (let i = 0; i < muscleLost.length / 2; i++) {
  const sum = muscleLost[i] + muscleLost[muscleLost.length - 1 - i];
  if (sum > answer) {
    answer = sum;
  }
}

console.log(answer.toString());
