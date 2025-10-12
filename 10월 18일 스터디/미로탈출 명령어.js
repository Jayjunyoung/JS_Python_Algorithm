function solution(n, m, x, y, r, c, k) {
  // 2차원 배열 board판 생성
  let board = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  // board 배열판 초기화
  board[x][y] = "S";
  board[r][c] = "E";

  // 불가능한 경우를 판단해주는 조건 로직
  let fastAnswer = k - (Math.abs(x - r) + Math.abs(y - c));
  if (fastAnswer < 0 || fastAnswer % 2 != 0) return "impossible";

  const dir = [
    [1, 0], // d
    [0, -1], // l
    [0, 1], // r
    [-1, 0], // u
  ];

  let str = {
    0: "d",
    1: "l",
    2: "r",
    3: "u",
  };

  let answer = "z".repeat(k);

  const dfs = (L, py, px, sum, dist) => {
    if (L > k) return;
    if (dist > k) return;

    if (L === k && py === r && px === c) {
      if (answer > sum) {
        answer = sum;
        return;
      }
    }
    // 이미 답을 찾았으면 조기종료
    if (answer !== "z".repeat(k)) return;

    for (let i = 0; i < 4; i++) {
      const dy = py + dir[i][0];
      const dx = px + dir[i][1];

      if (dy <= n && dy > 0 && (dx <= m) & (dx > 0)) {
        dfs(
          L + 1,
          dy,
          dx,
          sum + str[i],
          Math.abs(dy - r) + Math.abs(dx - c) + L + 1
        );
      }
    }
  };

  dfs(0, x, y, "", k);

  if (answer === "z".repeat(k)) return "impossible";

  return answer;
}
