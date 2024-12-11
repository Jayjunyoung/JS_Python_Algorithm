const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
//배열 요소 5개가 연속이어야 한다.

const array = input.map(Number).sort((a, b) => a - b);
let minToAdd = Infinity;

let start = 0;

for (let end = 0; end < n; end++) {
  //5보다 커지면 연속으로 5개 이어져야하는 규칙을 위반하므로 start를 앞으로 이동
  while (array[end] - array[start] >= 5) {
    start++;
  }

  const currentLength = end - start + 1;

  minToAdd = Math.min(minToAdd, 5 - currentLength);
}

console.log(minToAdd);
