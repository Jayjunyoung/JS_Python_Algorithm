const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const map = input.map((row) => row.split(" ").map(Number));
let visited = Array.from({ length: n }, () => Array(m).fill(false));

let dir = [
  //상, 하, 좌, 우 암묵적 그래프
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let pictureCount = 0;
let maxPictureSize = 0;

const bfs = (x, y) => {
  const queue = [[x, y]];
  visited[x][y] = true;

  let size = 1;

  while (queue.length) {
    const [curX, curY] = queue.shift();

    for (let i = 0; i < dir.length; i++) {
      const nextX = curX + dir[i][0];
      const nextY = curY + dir[i][1];

      if (nextX >= 0 && nextX < n && nextY >= 0 && nextY < m) {
        if (!visited[nextX][nextY] && map[nextX][nextY] === 1) {
          visited[nextX][nextY] = true;
          queue.push([nextX, nextY]);
          size++;
        }
      }
    }
  }

  return size;
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 1 && !visited[i][j]) {
      pictureCount++;
      const pictureSize = bfs(i, j);
      maxPictureSize = Math.max(maxPictureSize, pictureSize);
    }
  }
}

console.log(pictureCount);
console.log(maxPictureSize);
