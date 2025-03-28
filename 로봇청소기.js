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
    const backDir = (d + 6) % 4;

    const [backX, backY] = [x + dir[backDir][0], y + dir[backDir][1]];
    if (
      map[backX][backY] === 1 ||
      backX < 0 ||
      backY < 0 ||
      backX >= n ||
      backY >= m
    ) {
      break;
    } else {
      x = backX;
      y = backY;
      cnt = 0;
    }
  }

  if (!visited[x][y]) {
    visited[x][y] = true;
    map[x][y] = 2;
    ans++;
  }

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
