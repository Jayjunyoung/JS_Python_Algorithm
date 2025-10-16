function solution(n, results) {
  let answer = 0;
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(n + 1).fill(false));

  for (const [winner, loser] of results) {
    dp[winner][loser] = true;
  }

  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (dp[i][k] && dp[k][j]) {
          dp[i][j] = true;
        }
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    let count = 0;
    for (let j = 1; j <= n; j++) {
      if (dp[i][j] || dp[j][i]) count++;
    }
    if (count === n - 1) answer++;
  }

  return answer;
}
