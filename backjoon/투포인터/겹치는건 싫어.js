const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, k] = input.shift().split(" ").map(Number);
const array = input[0].split(" ").map(Number);

let count = Array(100001).fill(0); //일단 0으로 초기화
let start = 0;
let maxLength = 0;

for (let end = 0; end < n; end++) {
  const currentSum = array[end];
  count[currentSum]++;

  while (count[currentSum] > k) {
    count[array[start]]--;
    start++;
  }

  maxLength = Math.max(maxLength, end - start + 1);
}

console.log(maxLength);
