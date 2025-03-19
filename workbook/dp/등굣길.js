function solution(m, n, puddles) {
  const dp = new Array(n + 1).fill().map((_) => new Array(m + 1).fill(1));
  // [n+1][m+1] 크기의 배열을 0으로 초기화한다.
  // 각각 +1을 해주는 이유는 역시 DP 에서 많이 쓰이는 테크닉인데
  // m과 n의 위치에 주의하자! 문제에서는 m이 x축, n이 y축이다.

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (i === 1 && j === 1) {
        dp[1][1] = 1;
        continue;
      }
      // 해당 반복문에서 j가 x좌표, i가 y좌표인 것에 주의 -> 이 부분 좀 더 공부
      if (isPuddle(j, i, puddles)) continue;
      dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 1000000007;
    }
  }

  return dp[n][m];
}

// 주어진 좌표에 물 웅덩이가 있다면 true를 반환한다
// 이때 x, y좌표의 순서에 주의하자!
const isPuddle = (x, y, puddles) => {
  for (const puddle of puddles) {
    if (puddle[0] === y && puddle[1] === x) return true;
  }
  return false;
};
