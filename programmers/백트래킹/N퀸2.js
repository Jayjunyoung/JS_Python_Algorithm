function possibleFun(board, row) {
  //전부터 같은 라인 혹은 대각선에 있는지 체크

  for (let i = 1; i < row; i++) {
    if (board[i] === board[row]) return false;

    if (Math.abs(board[i] - board[row]) === Math.abs(i - row)) {
      return false;
    }
  }

  return true;
}

function solution(n) {
  let answer = 0;

  const dfs = (board, row) => {
    if (row === n) {
      answer++;
    } else {
      for (let i = 1; i <= n; i++) {
        board[row + 1] = i;
        if (!possibleFun(board, row + 1)) continue;
        dfs(board, row + 1);
      }
    }
  };

  for (let i = 1; i <= n; i++) {
    let board = Array(n + 1).fill(0);
    let row = 1;
    board[row] = i;
    dfs(board, row);
  }

  return answer;
}
