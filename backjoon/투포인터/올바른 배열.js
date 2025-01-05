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
  if (array[end] - array[start] >= 5) {
    //차이가 5보다 크거나 같다는건 5 6 7 8 9 10 즉 숫자가 6개가 정렬되어있다는 것
    //이땐 start를 뒤로 밀어서 5개를 맞춰야됌
    start++;
  }

  let currentLength = end - start + 1;

  minToAdd = Math.min(minToAdd, 5 - currentLength);
}

console.log(minToAdd);
