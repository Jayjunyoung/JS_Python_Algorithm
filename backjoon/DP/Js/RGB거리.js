const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
//n : 집의 갯수
// shift() 대신 input[0] 으로 해도 풀이 가능

const homes = input.map((v) => v.split(" ").map(Number));

const dp = homes;

for (let i = 1; i < n; i++) {
  //반복문의 시작을 0으로 함
  //만약 input[0] 이라면 반복문 인자 i의 시작은 2부터 3까지 진행
  dp[i][0] += Math.min(dp[i - 1][1], dp[i - 1][2]);
  dp[i][1] += Math.min(dp[i - 1][0], dp[i - 1][2]);
  dp[i][2] += Math.min(dp[i - 1][0], dp[i - 1][1]);
}

console.log(Math.min(...dp[n - 1]));
