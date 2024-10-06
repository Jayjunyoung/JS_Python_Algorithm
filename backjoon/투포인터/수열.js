const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input.shift().split(" ").map(Number);
const array = input[0].split(" ").map(Number);

let currentSum = 0;
let maxSum = -Infinity; // 최대값을 음수 무한대로 초기화.. 이 부분을 안해서 틀림

//첫 번째 구간의 합을 구하자
for (let i = 0; i < K; i++) {
  currentSum += array[i];
}

maxSum = currentSum;

for (let i = K; i < N; i++) {
  currentSum = currentSum - array[i - K] + array[i];
  maxSum = Math.max(maxSum, currentSum);
}

console.log(maxSum);
