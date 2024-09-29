const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

const map = input.map((row) => row.split(" ").map(Number));
let visited = Array.from({ length: n }, () => Array(n).fill(false));

let dir = [
  //우측 이동, 아래 이동
  [0, 1],
  [1, 0],
];

const bfs = (x, y) => {
  const queue = [[x, y]];
  visited[x][y] = true;

  while (queue.length) {
    const [curX, curY] = queue.shift();

    if (curX === n - 1 && curY === n - 1) {
      return true;
    }

    const jump = map[curX][curY];

    for (let i = 0; i < dir.length; i++) {
      const nextX = curX + dir[i][0] * jump;
      const nextY = curY + dir[i][1] * jump;

      if (nextX >= 0 && nextX < n && nextY >= 0 && nextY < n) {
        if (!visited[nextX][nextY]) {
          visited[nextX][nextY] = true;
          queue.push([nextX, nextY]);
        }
      }
    }
  }

  return false;
};

if (bfs(0, 0)) {
  console.log("HaruHaru");
} else {
  console.log("Hing");
}
