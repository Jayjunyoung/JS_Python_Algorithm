const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let [n, k] = input.shift().split(" ").map(Number);
let coins = input.map(Number).sort((a, b) => b - a);
let answer = 0; //동전갯수 구하기 위해 설정

for (let i = 0; i < coins.length; i++) {
  if (k < coins[i]) continue;
  else {
    answer += Math.floor(k / coins[i]);
    k %= coins[i];
  }
}

console.log(answer);
