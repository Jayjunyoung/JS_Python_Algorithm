const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift(); //5

//T: 선생님, S: 학생, X: 빈칸
let map = input.map((row) => row.split(" "));
let flag = false;

//상, 하, 좌, 우 이동
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

//bfs를 통해 감시여부 판단

const checkMap = (arr) => {
  //2차원 배열의 map이 들어가있음
  const queue = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[i][j] === "T") {
        queue.push([i, j]);
      }
    }
  }

  for (let i = 0; i < queue.length; i++) {
    const [cx, cy] = queue[i];
    for (let [dx, dy] of dir) {
      //기존에 if문을 썼기 때문에 에러
      let nx = cx;
      let ny = cy;
      while (nx >= 0 && nx < n && ny >= 0 && ny < n) {
        if (arr[nx][ny] === "O") break; //while문 빠져나가고 상위 for문에서 새로운 방향 좌표 설정

        if (arr[nx][ny] === "S") return false;

        nx += dx;
        ny += dy;
      }
    }
  }

  return true;
};

//dfs를 통해 장애물을 놓는걸로 구현
const dfs = (L) => {
  if (L === 3) {
    let res = checkMap(map.map((v) => [...v]));
    if (res) {
      flag = true;
      return;
    }
  } else {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (map[i][j] === "X") {
          map[i][j] = "O";
          dfs(L + 1);
          map[i][j] = "X";
        }
      }
    }
  }
};

dfs(0); //장애물 갯수 처음엔 0개
if (flag) {
  console.log("YES");
} else {
  console.log("NO");
}
