function cartesian(arrays) {
  return arrays.reduce(
    (acc, cur) => {
      return acc.flatMap((d) => cur.map((e) => [...d, e]));
    },
    [[]]
  );
}

/* 모든 경로를 가져온다. (DFS) */
function selectPath(v, x, y, paths, visited) {
  if (v.length === 4) {
    paths.add(JSON.stringify([...v])); // 중복 경로 제거를 위해 JSON.stringify() 활용
    return;
  }

  for (let i = 0; i < 4; i++) {
    /* 상하좌우 */
    let nx = x + dx[i],
      ny = y + dy[i];

    /* 경로가 존재하고 중복되지 않을 경우 */
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

/* 과일 수를 계산한다. */
function selectAllFruits(comb) {
  let visitedSet = new Set();
  for (let path of comb) {
    for (let [x, y] of path) {
      visitedSet.add(`${x},${y}`);
    }
  }
  let sum = 0;
  for (let pos of visitedSet) {
    let [x, y] = pos.split(",").map(Number);
    sum += treeInfo[x][y];
  }
  return sum;
}

/* 입력 데이터 세팅 */
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

/* 상우하좌[시계방향] */
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

//truee: 4 , friendNum : 2
const tree = parseInt(input[0].trim().split(" ")[0]);
const friendNum = parseInt(input[0].trim().split(" ")[1]);

const treeInfo = Array.from({ length: tree }, () => []);
//길이가 4인 2차원 배열 생성

/* 지도 그리기 */
for (let i = 0; i < tree; i++)
  for (let j = 0; j < tree; j++)
    treeInfo[i].push(parseInt(input[i + 1].split(" ")[j]));

/* 친구 위치 */
const friendXY = [];
for (let i = 1; i < friendNum + 1; i++) {
  let [x, y] = input[tree + i].split(" ").map(Number);
  friendXY.push([x - 1, y - 1]); // 1-based index를 0-based index로 변환
}

/* 친구 수 만큼 모든 경로를 가져온다. */
let allPaths = [];
friendXY.forEach((v) => {
  let paths = new Set(); // 중복 경로 제거
  let visited = new Set();
  visited.add(`${v[0]},${v[1]}`);
  selectPath([v], v[0], v[1], paths, visited);
  allPaths.push([...paths].map(JSON.parse)); // JSON 파싱하여 배열로 변환
});

/* 친구들의 경로들을 섞어 만든다.  */
let comb = cartesian(allPaths);

let result = 0;
/* 최대 과일 수를 찾는다. */
for (let v of comb) result = Math.max(result, selectAllFruits(v));

console.log(result);
