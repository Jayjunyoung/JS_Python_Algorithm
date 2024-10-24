const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m, b] = input.shift().split(" ").map(Number);

const arr = input.map((v) => v.split(" ").map(Number));

let ansTime = Infinity;
let ansHeight = -1;

//시간복잡도 상 3중 반복문도 문제없음
for (let h = 0; h <= 256; h++) {
  let inventoryCnt = 0;
  let removeCnt = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let curh = arr[i][j] - h;
      if (curh < 0) inventoryCnt -= curh;
      else removeCnt += curh;
    }
  }

  if (removeCnt + b >= inventoryCnt) {
    let time = 2 * removeCnt + inventoryCnt;
    if (ansTime >= time) {
      ansTime = time;
      ansHeight = h;
    }
  }
}

console.log(ansTime, ansHeight);
