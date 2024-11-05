const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const map = input.map((v) => v.split(" ").map(Number));
let visited = Array(n).fill(false);
let answer = Infinity;
//집, 치킨집 좌표 저장 배열
const house = [];
const chicken = [];

//집, 치킨집 좌표 각각 house, chicken 배열에 저장
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] === 1) house.push([i, j]);
    else if (map[i][j] === 2) chicken.push([i, j]);
  }
}

//집과 치킨집 사이 최소거리 구하는 함수
//getMinDistance 함수
const getMinDistance = () => {
  let sum = 0;
  house.forEach(([hx, hy]) => {
    let min = Infinity;
    chicken.forEach((_, idx) => {
      if (visited[idx] === true) {
        const [cx, cy] = chicken[idx];

        min = Math.min(min, Math.abs(hx - cx) + Math.abs(hy - cy));
      }
    });
    sum += min;
  });

  return sum;
};

//DFS 함수 구현
const DFS = (idx, cnt) => {
  if (cnt === m) {
    answer = Math.min(answer, getMinDistance());
  } else {
    for (let i = idx; i < chicken.length; i++) {
      visited[i] = true;
      DFS(i + 1, cnt + 1);
      visited[i] = false;
    }
  }
};

DFS(0, 0);
console.log(answer);
