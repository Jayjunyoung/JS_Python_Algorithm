const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
let map = input.map((row) => row.split(" ").map(Number));

const cctv = [];
let minBlindSpot = Infinity;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] >= 1 && map[i][j] <= 5) {
      cctv.push([i, j, map[i][j]]); //cctv의 위치와 타입을 하나의 배열에 담아서 push
    }
  }
}

const directions = [
  //이걸 구현하는게 핵심이었다.
  [], // 0 (빈 공간)
  [[0], [1], [2], [3]], // 1번 CCTV
  [
    [0, 2],
    [1, 3],
  ], // 2번 CCTV
  [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ], // 3번 CCTV
  [
    [0, 1, 3],
    [0, 1, 2],
    [1, 2, 3],
    [0, 2, 3],
  ], // 4번 CCTV
  [[0, 1, 2, 3]], // 5번 CCTV
];
const dir = [
  [-1, 0], // 상
  [0, 1], // 우
  [1, 0], // 하
  [0, -1], // 좌
];

const monitor = (tempMap, x, y, d) => {
  let [dx, dy] = dir[d];
  while (true) {
    x += dx;
    y += dy;
    if (x < 0 || x >= n || y < 0 || y >= m || tempMap[x][y] === 6) break; // 범위 초과 or 벽
    if (tempMap[x][y] === 0) tempMap[x][y] = -1; // 감시 영역 표시
  }
};

//방문 불가능한 영역을 찾는다.
const dfs = (depth, map) => {
  //모든 cctv를 다 검사했을 때
  if (depth === cctv.length) {
    let blindSpot = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (map[i][j] === 0) blindSpot++;
      }
    } //사각지대 넓이 갱신
    minBlindSpot = Math.min(minBlindSpot, blindSpot);
    return;
  }

  const [x, y, type] = cctv[depth];

  for (let dirs of directions[type]) {
    const tempMap = map.map((row) => [...row]);
    for (let d of dirs) {
      monitor(tempMap, x, y, d);
    }
    dfs(depth + 1, tempMap);
  }
};

dfs(0, map);
console.log(minBlindSpot);
