const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

const counsel = input.map((tp) => tp.split(" ").map(Number));

const solution = (n, counsel) => {
  const dp = Array(n).fill(0);

  for (let i = 0; i < dp.length; i++) {
    const [t, p] = counsel[i];

    if (t + i > n) continue;
    dp[i] += p;

    for (let j = i + t; j < n; j++) {
      dp[j] = Math.max(dp[j], dp[i]);
    }
  }

  return Math.max(...dp);
};

console.log(solution(n, counsel));
