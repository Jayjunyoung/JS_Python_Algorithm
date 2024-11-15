const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

//bottom-up 방식으로 사용
const n = +input.shift();
const array = input.map((v) => v.split(" ").map(Number));
let dp = [];

dp[0] = [array[0][0]];
//[ [7] ] 이렇게 데이터가 들어감

for (let i = 1; i < n; i++) {
  dp[i] = [];
  for (let j = 0; j <= i; j++) {
    if (j === 0) {
      dp[i][j] = dp[i - 1][j] + array[i][j];
    } else if (j === i) {
      dp[i][j] = dp[i - 1][j - 1] + array[i][j];
    } else {
      dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + array[i][j];
    }
  }
}

console.log(Math.max(...dp[n - 1]));
