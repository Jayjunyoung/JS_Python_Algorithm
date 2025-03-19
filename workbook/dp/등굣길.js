function solution(m, n, puddles) {
  const MOD = 1000000007;
  const dp = new Array(n + 1).fill().map(() => new Array(m + 1).fill(0));

  // 출발점 초기화
  dp[1][1] = 1;

  for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= m; col++) {
      if (row === 1 && col === 1) continue; // 시작점은 이미 설정됨
      if (isPuddle(col, row, puddles)) {
        dp[row][col] = 0; // 물웅덩이 위치는 경로 없음
      } else {
        let fromTop = row > 1 ? dp[row - 1][col] : 0;
        let fromLeft = col > 1 ? dp[row][col - 1] : 0;
        dp[row][col] = (fromTop + fromLeft) % MOD;
      }
    }
  }

  return dp[n][m]; // 도착점의 경로 수 반환
}

// 물웅덩이 확인 함수
const isPuddle = (x, y, puddles) => {
  for (const puddle of puddles) {
    if (puddle[0] === x && puddle[1] === y) return true;
  }
  return false;
};
