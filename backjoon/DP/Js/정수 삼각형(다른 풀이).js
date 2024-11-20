const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
let pyramid = Array.from({ length: n }, (_, idx) => Array(idx + 1).fill(0));
//pyramid 배열 구조는 어떻게 될지 생각해보기

for (let i = 1; i <= n; i++) {
  let curRow = input[i].split(" ").map(Number);
  pyramid[i - 1] = curRow;
}

for (let i = 1; i < n; i++) {
  for (let j = 0; j < pyramid[i].length; j++) {
    if (j === 0) {
      //맨 왼쪽 끝이라면
      pyramid[i][j] = pyramid[i - 1][j] + pyramid[i][j];
    } else if (j === pyramid[i].length - 1) {
      //맨 오른쪽 끝이라면
      pyramid[i][j] = pyramid[i - 1][j - 1] + pyramid[i][j];
    } else {
      pyramid[i][j] =
        Math.max(pyramid[i - 1][j - 1], pyramid[i - 1][j]) + pyramid[i][j];
    }
  }
}

console.log(Math.max(...pyramid[n - 1]));
