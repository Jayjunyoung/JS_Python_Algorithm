const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
//n이 5, m이 4인 경우
let answer = 0;
const check = Array(n).fill(0);
//인접 리스트
const adjArr = Array.from({ length: n }, () => []);
//0은 미 방문
let flag = 0; //재귀 결정

for (let i = 0; i < m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  adjArr[a].push(b);
  adjArr[b].push(a);
}

const dfs = (num, cnt) => {
  if (flag) return;
  check[num] = 1;
  if (cnt === 4) {
    flag = 1;
    answer = 1;
    return;
  }

  for (let i = 0; i < adjArr[num].length; i++) {
    const next = adjArr[num][i];
    if (!check[next]) {
      dfs(next, cnt + 1);
    }
  }

  check[num] = 0;
};

for (let i = 0; i < n; i++) {
  dfs(i, 0);
  //if (flag) break;
}

console.log(answer);
