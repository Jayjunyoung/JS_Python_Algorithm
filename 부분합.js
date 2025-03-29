const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, s] = input.shift().split(" ").map(Number);

const arr = input[0].split(" ").map(Number);

let minLength = Infinity;
let start = 0;
let end = 0;
let sum = 0;

while (end < n) {
  sum += arr[end];

  while (sum >= s) {
    sum -= arr[start];
    minLength = Math.min(minLength, end - start + 1);
    start++;
  }

  end++;
}

console.log(minLength === Infinity ? 0 : minLength);
