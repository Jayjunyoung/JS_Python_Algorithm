const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);

let map = input.map((row) => row.split(" ").map(Number));
let ans = 0;

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const bfs = (arr) => {
  let queue = [];
  let cnt = 0; //안전영역 갯수 세기위해

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 2) queue.push([i, j]);
    }
  }

  while (queue.length) {
    const [cx, cy] = queue.shift();

    for (let [dx, dy] of dir) {
      const [nx, ny] = [cx + dx, cy + dy];
      if (nx >= 0 && nx < n && ny >= 0 && ny < m && arr[nx][ny] === 0) {
        arr[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 0) {
        cnt++;
      }
    }
  }

  return cnt;
};

//장애물을 놓는 것
const dfs = (count) => {
  if (count === 3) {
    let copyMap = map.map((v) => [...v]);
    let res = bfs(copyMap);

    ans = Math.max(ans, res);
    return;
  } else {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (map[i][j] === 0) {
          map[i][j] = 1;
          dfs(count + 1);
          map[i][j] = 0;
        }
      }
    }
  }
};

dfs(0);

console.log(ans);
