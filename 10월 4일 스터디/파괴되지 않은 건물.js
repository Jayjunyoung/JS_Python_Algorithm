const prefixSum = (pSum, skill) => {
  skill.forEach((row) => {
    const [type, r1, c1, r2, c2, degree] = row;
    const d = type === 1 ? -degree : degree;

    pSum[r1][c1] += d;
    pSum[r2 + 1][c1] += -d;
    pSum[r1][c2 + 1] += -d;
    pSum[r2 + 1][c2 + 1] += d;
  });
  //왼쪽에서 오른쪽으로 누적합
  for (let r = 0; r < pSum.length; r++) {
    for (let c = 1; c < pSum[0].length; c++) {
      pSum[r][c] += pSum[r][c - 1];
    }
  }
  //위에서 아래로 누적합
  for (let r = 1; r < pSum.length; r++) {
    for (let c = 0; c < pSum[0].length; c++) {
      pSum[r][c] += pSum[r - 1][c];
    }
  }
};

function solution(board, skill) {
  const pSum = Array.from({ length: board.length + 1 }, () =>
    Array(board[0].length + 1).fill(0)
  );
  prefixSum(pSum, skill);

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      board[r][c] += pSum[r][c];
    }
  }

  return board
    .map((v) => v.filter((v2) => v2 > 0).length)
    .reduce((acc, cur) => acc + cur);
}
