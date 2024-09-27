const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

const sortedRopes = input.map(Number).sort((a, b) => a - b);
let array = [];

for (let i = 0; i < n; i++) {
  array.push(sortedRopes[i] * (n - i));
}

console.log(Math.max(...array));
