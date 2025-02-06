const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

//이 코드로 풀면 오답인 이유
//해당 코드는 경로가 겹치면 전혀 점수를 인정하지 않고 0을 반환한다.
//중복처리에서 에러가 있음

//시계방향의 암묵적 그래프
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

const tree = parseInt(input[0].trim().split(" ")[0]); /* n 값 */
const friendNum = parseInt(input[0].trim().split(" ")[1]); /* m 값 */

const treeInfo = Array.from({ length: tree }, () => []);

for (let i = 0; i < tree; i++) {
  for (let j = 0; j < tree; j++) {
    treeInfo[i].push(input[i + 1].split(" ").map(Number)[j]);
  }
}

//친구들이 있는 위치를 friendXy 배열에 넣는다.
const friendXY = [];
for (let i = 1; i < friendNum + 1; i++) {
  let [x, y] = input[tree + i].split(" ").map(Number);
  friendXY.push([x - 1, y - 1]); // 1-based index를 0-based index로 변환
}

//dfs 로직 , 백트래킹 로직
function selectPath(v, x, y, paths) {
  if (v.length === 4) {
    paths.push([...v]);
    return;
  }

  for (let i = 0; i < 4; i++) {
    let [nx, ny] = [x + dx[i], y + dy[i]];
    if (
      tree > nx &&
      nx >= 0 &&
      tree > ny &&
      ny >= 0 &&
      //같은 경로가 없을 경우에만 true반환
      //있을 경우엔 false 반환 -> !을 통해 boolean값을 변환함
      !v.some((v) => v[0] === nx && v[1] === ny)
    ) {
      v.push([nx, ny]); //이때까진 계쏙 2차원 배열 형태
      selectPath(v, nx, ny, paths);
      v.pop();
    }
  }
}

function cartesian(arrays) {
  return arrays.reduce(
    (acc, cur) => {
      return acc.flatMap((d) => cur.map((e) => [...d, e]));
    },
    //acc에 초기값이 들어감
    [[]]
  );
}

function selectAllFruits(comb) {
  let res = 0;
  let visited = new Set();

  for (let v of comb) {
    for (let [x, y] of v) {
      if (visited.has(`${x},${y}`)) return 0;
      visited.add(`${x},${y}`);
      //방문 처리 해주고 과일 점수 더해줘
      res += treeInfo[x][y];
    }
  }

  return res;
}

let allPaths = [];

friendXY.forEach((v) => {
  let paths = [];

  selectPath([v], v[0], v[1], paths);
  allPaths.push(paths);
});

/* 친구들의 경로들을 섞어 만든다.  */
let comb = cartesian(allPaths);

let result = 0;
/* 최대 과일 수를 찾는다. */
for (let v of comb) result = Math.max(result, selectAllFruits(v));

console.log(result);
