const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [r, c, k] = input.shift().split(" ").map(Number);

let graph = Array.from({ length: r }, () => []); //인접리스트기반
for (let i = 0; i < r; i++) {
  graph[i] = input[i].split("");
}

let visited = Array.from({ length: r }, () => Array(c).fill(false));
let cnt = 0;

//상, 하, 좌, 우 이동
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const dfs = (row, col, depth) => {
  if (depth === k) {
    if (row === 0 && col === c - 1) {
      cnt++;
    }
    return;
  } else {
    for (let [dx, dy] of dir) {
      const nCol = col + dx;
      const nRow = row + dy;

      if (
        nRow >= 0 &&
        nCol >= 0 &&
        nRow < r &&
        nCol < c &&
        graph[nRow][nCol] !== "T"
      ) {
        if (!visited[nRow][nCol]) {
          visited[nRow][nCol] = true;
          dfs(nRow, nCol, depth + 1);
          visited[nRow][nCol] = false;
        }
      }
    }
  }
};

//현수 출발 지점 방문처리
visited[r - 1][0] = true;
dfs(r - 1, 0, 1);

console.log(cnt);
