let input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);

let [x, y, d] = input.shift().split(" ").map(Number);

let map = input.map((row) => row.split(" ").map(Number));
let visited = Array.from({ length: n }, () => Array(m).fill(false));
let ans = 0;
let cnt = 0;

const dir = [
  [-1, 0], //d : 0
  [0, 1], //d : 1
  [1, 0], //d : 2
  [0, -1], // d : 3
];

while (1) {
  if (cnt === 4) {
    const back_dir = (d + 6) % 4;

    const [back_x, back_y] = [x + dir[back_dir][0], y + dir[back_dir][1]];

    if (
      map[back_x][back_y] === 1 ||
      back_x < 0 ||
      back_y < 0 ||
      back_x >= n ||
      back_y >= m
    ) {
      break;
    } else {
      x = back_x;
      y = back_y;
      cnt = 0;
    }
  }

  //방문하지 않았다면 어떻게 처리할래
  if (!visited[x][y]) {
    visited[x][y] = true;
    map[x][y] = 2;
    ans++;
  }

  //좌표 처리
  const leftDir = (d + 3) % 4;
  const [leftX, leftY] = [x + dir[leftDir][0], y + dir[leftDir][1]];

  if (map[leftX][leftY] === 0) {
    x = leftX;
    y = leftY;
    cnt = 0;
  } else {
    cnt++;
  }

  d = (d + 3) % 4;
}

console.log(ans);
