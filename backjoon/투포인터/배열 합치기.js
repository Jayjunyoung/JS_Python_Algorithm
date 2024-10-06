const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [a, b] = input.shift().split(" ").map(Number);
let answer = [];

const aArray = input[0].split(" ").map(Number);

aArray.forEach((v, i) => {
  answer.push(v);
});

const bArray = input[1].split(" ").map(Number);

bArray.forEach((v, i) => {
  answer.push(v);
});

console.log(answer.sort((a, b) => a - b).join(" "));
