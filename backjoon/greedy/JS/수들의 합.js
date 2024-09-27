const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const s = +input.shift();
let sum = 0;
let count = 0;
let number = 1;

while (sum + number <= s) {
  sum += number;
  count++;
  number++;
}

console.log(count);
