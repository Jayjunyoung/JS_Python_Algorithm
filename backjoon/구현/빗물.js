const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [h, w] = input.shift().split(" ").map(Number);
const row = input[0].split(" ").map(Number);

//w만큼 배열 만들기
let leftMax = Array(w).fill(0);
let rightMax = Array(w).fill(0);

leftMax[0] = row[0];
for (let i = 1; i < w; i++) {
  leftMax[i] = Math.max(leftMax[i - 1], row[i]);
}

rightMax[w - 1] = row[w - 1];

for (let i = w - 2; i >= 0; i--) {
  rightMax[i] = Math.max(rightMax[i + 1], row[i]);
}

let water = 0;

for (let i = 0; i < w; i++) {
  water += Math.min(leftMax[i], rightMax[i]) - row[i];
}

console.log(water);
