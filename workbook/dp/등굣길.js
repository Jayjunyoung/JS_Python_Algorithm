function solution(m, n, puddles) {
  const dp = new Array(n + 1).fill().map(() => new Array(m + 1).fill(1));

  for (let row = 1; row < n; row++) {
    for (let col = 1; col < m; col++) {
      if (row === 1 && col === 1) {
        dp[1][1] = 1;
        continue;
      }
      if (isPuddle(col, row, puddles)) continue;
      dp[row][col] = (dp[row - 1][col] + dp[row][col - 1]) % 1000000007;
    }
  }

  return dp[n][m];
}

// 물웅덩이가 있는지 확인하는 함수
const isPuddle = (col, row, puddles) => {
  for (const puddle of puddles) {
    if (puddle[0] === col && puddle[1] === row) return true;
  }
  return false;
};
