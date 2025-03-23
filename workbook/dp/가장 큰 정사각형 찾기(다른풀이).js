function solution(board) {
  const rows = board.length;
  const cols = board[0].length;

  // dp 배열 초기화 (board와 동일한 크기, 0으로 채움)
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));
  let maxSquare = 0;

  // 첫 번째 행과 열은 board 값을 그대로 복사합니다.
  for (let i = 0; i < rows; i++) {
    dp[i][0] = board[i][0];
    maxSquare = Math.max(maxSquare, dp[i][0]);
  }
  for (let j = 0; j < cols; j++) {
    dp[0][j] = board[0][j];
    maxSquare = Math.max(maxSquare, dp[0][j]);
  }

  // dp 배열 채우기: 각 칸에서 만들 수 있는 가장 큰 정사각형의 변의 길이 계산
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (board[i][j] === 1) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        maxSquare = Math.max(maxSquare, dp[i][j]);
      } else {
        dp[i][j] = 0;
      }
    }
  }

  return maxSquare * maxSquare;
}
