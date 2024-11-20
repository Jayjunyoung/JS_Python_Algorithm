const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const board = input.map((row) => row.split(" ").map(Number));
let ans = 0;

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const bfs = (arr) => {
  //board판 얕은 복사로 가져온 것
  let cnt = 0;
  let queue = [];

  //바이러스 발견하면 좌표 queue에 넣기
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 2) queue.push([i, j]);
    }
  }

  while (queue.length) {
    //바이러스가 0인 곳을 상하좌우로 감염
    const [curX, curY] = queue.shift();

    for (let [dx, dy] of dir) {
      const [nx, ny] = [curX + dx, curY + dy];
      if (nx >= 0 && nx < n && ny >= 0 && ny < m && arr[nx][ny] === 0) {
        //0인 곳을 찾아 바이러스에 감염 시키기
        arr[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    }
  }

  //바이러스에 감염 된 영역을 제외 + 안전영역 세는 부분
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 0) {
        cnt++;
      }
    }
  }

  return cnt;
};

const dfs = (cnt) => {
  //벽을 사용하는 건 백트래킹 사용
  if (cnt === 3) {
    //board의 각 행에 대하여 얕은복사 실시
    //새로운 배열을 생성하여 수정 가능한 복사본을 만들어야 하는 상황
    let arr = board.map((v) => [...v]);
    const cntOfSafe = bfs(arr);

    ans = Math.max(ans, cntOfSafe);
    return;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 0) {
        board[i][j] = 1;
        dfs(cnt + 1);
        board[i][j] = 0;
      }
    }
  }
};

dfs(0);
console.log(ans);
