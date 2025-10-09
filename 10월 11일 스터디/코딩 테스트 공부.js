const solution = (alp, cop, problems) => {
  const MAX_INT = Infinity;

  // 목표 알고력 및 코딩력 구하기
  let alpMax = 0;
  let copMax = 0;
  for (let i = 0; i < problems.length; i++) {
    if (problems[i][0] > alpMax) alpMax = problems[i][0];
    if (problems[i][1] > copMax) copMax = problems[i][1];
  }
  // 초기 능력치가 이미 해결가능한 경우 최대 능력치로 설정
  if (alp > alpMax) alp = alpMax;
  if (cop > copMax) cop = copMax;

  // dp 배열 초기화
  const dp = Array.from({ length: 151 }, () => Array(151).fill(MAX_INT));
  dp[alp][cop] = 0; // 초기 상태 시간 0으로 설정

  for (let i = alp; i <= alpMax; i++) {
    for (let j = cop; j <= copMax; j++) {
      if (i == alpMax && j == copMax) break;

      // 1. 알고리즘 공부하기 -> 1을 높이기 위해서 1의 시간이 필요
      // 현재 알고력이 목표보다 낮으면 1을 높일 수 있음
      if (i < alpMax) {
        dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
      }

      // 2. 코딩 공부하기 -> 1을 높이기 위해서 1의 시간이 필요
      if (j < copMax) {
        dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);
      }

      // 3. 문제 풀기 -> 각 문제마다 문제를 풀면 올라가는 알고력과 코딩력이 정해져 있음 (같은 문제 여러 번 가능)
      for (let k = 0; k < problems.length; k++) {
        const [alpReq, copReq, alpRwd, copRwd, cost] = problems[k];

        // (현재 풀 수 있는 문제만 풀 수 있기 때문에 아래의 if 조건문 추가)
        if (i >= alpReq && j >= copReq) {
          const alpSum = i + alpRwd;
          const copSum = j + copRwd;

          if (alpSum >= alpMax && copSum >= copMax) {
            dp[alpMax][copMax] = Math.min(dp[alpMax][copMax], dp[i][j] + cost);
          } else if (alpSum >= alpMax) {
            // 알고리즘은 목표에 도달했지만 코딩력이 목표에 도달하지 못한 경우
            // 알고리즘은 이미 목표에 도달했으므로 코딩력이 목표에 도달할려면 보상만큼 증가
            dp[alpMax][j + copRwd] = Math.min(
              dp[alpMax][j + copRwd],
              dp[i][j] + cost
            );
          } else if (copSum >= copMax) {
            // 코딩력은 목표에 도달했지만 알고리즘은 목표에 도달하지 못한 경우
            // 코딩력은 이미 목표에 도달했으므로 알고리즘이 목표에 도달할려면 보상만큼 증가
            dp[i + alpRwd][copMax] = Math.min(
              dp[i + alpRwd][copMax],
              dp[i][j] + cost
            );
          } else {
            // 알고리즘과 코딩력 모두 목표에 도달하지 못한 경우
            // 알고리즘과 코딩력 모두 보상만큼 증가
            dp[i + alpRwd][j + copRwd] = Math.min(
              dp[i + alpRwd][j + copRwd],
              dp[i][j] + cost
            );
          }
        }
      }
    }
  }

  return dp[alpMax][copMax];
};
