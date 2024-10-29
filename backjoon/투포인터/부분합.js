const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, s] = input.shift().split(" ").map(Number);
//n = 10 , s = 15
const arr = input[0].split(" ").map(Number);
let minLength = Infinity;
let sum = 0;
let i = 0;
let j = 0;

while (j < n) {
  sum += arr[j];

  while (sum >= s) {
    sum -= arr[i];
    minLength = Math.min(minLength, j - i + 1);
    i++;
  }

  j++;
}

console.log(minLength === Infinity ? 0 : minLength);
