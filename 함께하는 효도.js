const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
/* 상우하좌[시계방향] */
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

//나무 갯수
const tree = parseInt(input[0].trim().split(" ")[0]);
//친구 인원 수
const friendNum = parseInt(input[0].trim().split(" ")[1]);

const treeInfo = Array.from({ length: tree }, () => []);

//지도에 수확량을 대입 함
for (let i = 0; i < tree; i++) {
  for (let j = 0; j < tree; j++) {
    treeInfo[i].push(+input[i + 1].split(" ")[j]);
  }
}

const friendXY = [];
for (let i = 1; i < friendNum + 1; i++) {
  const [x, y] = input[tree + i].split(" ").map(Number);
  friendXY.push([x - 1, y - 1]);
}

function cartesian(arrays) {
  return arrays.reduce(
    (acc, cur) => {
      return acc.flatMap((d) => cur.map((e) => [...d, e]));
    },
    [[]]
  );
}

//dfs , 백트래킹

function selectPath(v, x, y, paths, visited) {
  if (v.length === 4) {
    paths.add(JSON.stringify([...v]));
    return;
  }

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i],
      ny = y + dy[i];

    if (
      tree > nx &&
      nx >= 0 &&
      tree > ny &&
      ny >= 0 &&
      !visited.has(`${nx},${ny}`)
    ) {
      visited.add(`${nx},${ny}`);
      v.push([nx, ny]);
      selectPath(v, nx, ny, paths, visited);
      v.pop();
      visited.delete(`${nx},${ny}`);
    }
  }
}

function selectAllFruits(comb) {
  let visitedSet = new Set();
  for (let path of comb) {
    for (let [x, y] of path) {
      visitedSet.add(`${x},${y}`);
    }
  }

  let sum = 0;
  for (let pos of visitedSet) {
    const [x, y] = pos.split(",").map(Number);
    sum += treeInfo[x][y];
  }

  return sum;
}

let allResult = [];

friendXY.forEach((v) => {
  let paths = new Set();
  let visited = new Set();

  visited.add(`${v[0]},${v[1]}`);
  selectPath([v], v[0], v[1], paths, visited);
  allResult.push([...paths].map(JSON.parse));
});

let comb = cartesian(allResult);

let result = 0;

for (let v of comb) {
  result = Math.max(result, selectAllFruits(v));
}

console.log(result);
