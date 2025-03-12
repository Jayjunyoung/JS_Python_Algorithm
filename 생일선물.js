const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, d] = input.shift().split(" ").map(Number);

const line = input.map((v) => v.split(" ").map(Number));
line.sort((a, b) => a[0] - b[0]);

let result = 0;
let start = 0;
let sum = 0;

for (let end = 0; end < n; end++) {
  sum += line[end][1];

  while (line[end][0] - line[start][0] >= d) {
    sum -= line[start][1];
    start++;
  }

  result = Math.max(result, sum);
}

console.log(result);
