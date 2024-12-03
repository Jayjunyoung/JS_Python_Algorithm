function solution(triangle) {
  let answer = 0;

  let dp = [];
  //기존에 dp배열을 1차원 기반으로 0으로 채웠는데 이거때매 하나틀림
  dp[0] = [triangle[0][0]];
  //bottom-up방식 -> 작은 문제부터 접근하여

  for (let i = 1; i < triangle.length; i++) {
    dp[i] = [];
    for (let j = 0; j <= i; j++) {
      //맨 왼쪽 끝일 경우
      if (j === 0) {
        dp[i][j] = dp[i - 1][j] + triangle[i][j];
        //이전까지 누적된 합 + 현재 삼각형에서의 위치
      } else if (j === i) {
        //맨 오른쪽 끝일 경우
        dp[i][j] = dp[i - 1][j - 1] + triangle[i][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
      }
    }
  }

  return Math.max(...dp[triangle.length - 1]);
}
