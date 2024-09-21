const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

const people = input[0].split(" ").map(Number);
//오름차순 정렬
people.sort((a, b) => a - b);

let total = 0;

for (let i = 0; i < n; i++) {
  let sum = people[i];
  for (let j = 0; j < i; j++) {
    sum += people[j];
  }

  total += sum;
}

console.log(total);
