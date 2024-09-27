const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

const sortedRopes = input.map(Number).sort((a, b) => b - a); // 내림차순 정렬
let maxWeight = 0;

for (let i = 0; i < n; i++) {
  const currentWeight = sortedRopes[i] * (i + 1); // 현재 로프까지 사용할 때 들 수 있는 최대 무게
  maxWeight = Math.max(maxWeight, currentWeight); // 최댓값을 갱신
}

console.log(maxWeight);
