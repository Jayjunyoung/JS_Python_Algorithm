const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [m, n, k] = input.shift().split(" ").map(Number);
const rect = input.map((val) => val.split(" ").map(Number));

let map = Array.from({ length: m }, () => Array(n).fill(0));
let visited = Array.from({ length: m }, () => Array(n).fill(false));

let cnt;

const area = [];
//넓이를 담는 배열

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

//직사각형 넓이 채우기
for (let i = 0; i < k; i++) {
  const arr = rect[i];
  const [x1, y1, x2, y2] = arr;

  // 좌표 변환: y 좌표를 맨 아래에서 위로 변환
  const ny1 = m - y2; // y1 좌표 변환
  const ny2 = m - y1; // y2 좌표 변환

  for (let j = x1; j < x2; j++) {
    for (let k = ny1; k < ny2; k++) {
      map[k][j] = 1;
      visited[k][j] = true;
    }
  }
}

const dfs = (x, y) => {
  visited[x][y] = true;
  cnt++;

  for (let [dx, dy] of dir) {
    const nx = dx + x;
    const ny = dy + y;

    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < m &&
      ny < n &&
      !visited[nx][ny] &&
      map[nx][ny] === 0
    ) {
      dfs(nx, ny);
    }
  }
};

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] === 0 && !visited[i][j]) {
      cnt = 0;
      dfs(i, j);
      area.push(cnt);
    }
  }
}

console.log(area.length);
console.log(area.sort((a, b) => a - b).join(" "));
