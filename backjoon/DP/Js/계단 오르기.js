const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

//dp 대표적인 문제
const n = +input[0];

const dp = Array(n + 1).fill(0);

dp[1] = input[1];
dp[2] = dp[1] + input[2];
dp[3] = Math.max(input[1], input[2]) + input[3];

for (let i = 4; i <= n; i++) {
  dp[i] = Math.max(dp[i - 2] + input[i], dp[i - 3] + input[i - 1] + input[i]);
}

console.log(dp[n]);
