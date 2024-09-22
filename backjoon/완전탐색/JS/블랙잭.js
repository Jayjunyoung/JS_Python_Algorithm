const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input.shift().split(" ").map(Number);

const Array = input[0].split(" ").map(Number);
let sum = 0;

for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    for (let k = j + 1; k < N; k++) {
      if (Array[i] + Array[j] + Array[k] > K) continue;
      else {
        sum = Math.max(sum, Array[i] + Array[j] + Array[k]);
      }
    }
  }
}

console.log(sum);
