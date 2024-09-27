const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

const people = input[0].split(" ").map(Number);
//오름차순 정렬
people.sort((a, b) => a - b);

//누적값을 담는 변수
let sum = 0;
let cumulative = 0;

for (let i = 0; i < n; i++) {
  cumulative += people[i];
  sum += cumulative;
}

console.log(sum);
