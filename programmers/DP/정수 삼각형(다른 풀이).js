function solution(triangle) {
  let answer = 0;

  let dp = triangle[triangle.length - 1].slice();
  //triangle 배열 마지막 요소를 복사하기 위해 slice 사용
  //bottom - up 방식

  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[j] = Math.max(dp[j], dp[j + 1]) + triangle[i][j];
    }
  }

  return dp[0];
}
