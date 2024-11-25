function solution(part_times) {
  // 종료일 기준으로 정렬
  part_times.sort((a, b) => a[1] - b[1]);

  // DP 배열을 생성하여 최대 급여를 저장
  const dp = Array(part_times.length).fill(0);
  dp[0] = part_times[0][2]; // 첫 번째 아르바이트의 급여

  for (let i = 1; i < part_times.length; i++) {
    const [start, end, pay] = part_times[i];

    // 현재 아르바이트를 선택하는 경우 최대 급여를 초기화
    let includePay = pay;

    // 이전 아르바이트 중에서 겹치지 않는 아르바이트를 찾음
    for (let j = i - 1; j >= 0; j--) {
      if (part_times[j][1] <= start) {
        includePay += dp[j];
        break;
      }
    }

    // 현재 아르바이트를 포함하는 경우와 포함하지 않는 경우 중 최댓값 선택
    dp[i] = Math.max(dp[i - 1], includePay);
  }

  // 최종 결과는 dp 배열의 마지막 값
  return dp[part_times.length - 1];
}
