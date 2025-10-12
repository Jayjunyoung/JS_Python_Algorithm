function solution(n, m, x, y, r, c, k) {
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

  const dfs = (L, px, py, sum, dist) => {
    if (L > k) return;
    if (dist > k) return;

    if (L === k && px === r && py === c) {
      if (answer > sum) {
        answer = sum;
        return;
      }
    }
    // 이미 답을 찾았으면 조기종료
    if (answer !== "z".repeat(k)) return;

    for (let i = 0; i < 4; i++) {
      const dx = px + dir[i][0];
      const dy = py + dir[i][1];

      if (dx <= n && dx > 0 && (dy <= m) & (dy > 0)) {
        dfs(
          L + 1,
          dx,
          dy,
          sum + str[i],
          Math.abs(dx - r) + Math.abs(dy - c) + L + 1
        );
      }
    }
  };

  dfs(0, x, y, "", k);

  if (answer === "z".repeat(k)) return "impossible";

  return answer;
}
