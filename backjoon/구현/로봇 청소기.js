const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
let [x, y, d] = input.shift().split(" ").map(Number);

let ans = 0;
let cnt = 0;

const room = input.map((v) => v.split(" ").map(Number));
const visited = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => false)
);

const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

while (1) {
  if (!visited[x][y]) {
    visited[x][y] = true;
    room[x][y] = 2;
    ans++;
  }

  let cleaned = false;
  for (let i = 0; i < 4; i++) {
    d = (d + 3) % 4;
    const [nx, ny] = [x + dir[d][0], y + dir[d][1]];

    if (
      nx >= 0 &&
      nx < n &&
      ny >= 0 &&
      ny < m &&
      room[nx][ny] === 0 &&
      !visited[nx][ny]
    ) {
      x = nx;
      y = ny;
      cnt = 0;
      cleaned = true;
      break;
    }
  }

  if (!cleaned) {
    cnt++;

    const [backX, backY] = [x - dir[d][0], y - dir[d][1]];
    if (room[backX][backY] === 1) break;

    x = backX;
    y = backY;
    cnt = 0;
  }
}

console.log(ans);
