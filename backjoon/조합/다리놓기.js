const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = +input[0];

let dp = Array.from({ length: 31 }, () => Array(31).fill(0));

for (let i = 0; i <= 30; i++) {
  dp[i][0] = 1; //i개 중 에서 0개 선택
  dp[i][i] = 1; //i개 중 에서 i개 선택

  for (let j = 1; j < i; j++) {
    dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
  }
}

for (let t = 1; t <= T; t++) {
  const [n, m] = input[t].split(" ").map(Number);
  //// M개의 동쪽 사이트 중 N개의 서쪽 사이트를 선택하는 경우의 수 출력
  console.log(dp[m][n]);
}
