const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

//BigInt로 mapping
const distance = input[0].split(" ").map(BigInt);

const gasPrice = input[1].split(" ").map(BigInt);
let cost = 0n;

let currPrice = gasPrice[0];

for (let i = 0; i < n - 1; i++) {
  cost += currPrice * distance[i];
  if (currPrice > gasPrice[i + 1]) {
    currPrice = gasPrice[i + 1];
  }
}
//BigInt이기 때문에 출력시에는 String으로 변환
console.log(String(cost));
