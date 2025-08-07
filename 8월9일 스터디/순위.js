function solution(n, results) {
  let answer = 0;
  const dp = Array.from({ length: n }, () => Array(n).fill(false));

  for (const [a, b] of results) {
    dp[a - 1][b - 1] = true;
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dp[i][k] && dp[k][j]) {
          dp[i][j] = true;
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = 0; j < n; j++) {
      if (dp[i][j] || dp[j][i]) {
        count++;
      }

      if (count === n - 1) {
        answer++;
        break;
      }
    }
  }

  return answer;
}
