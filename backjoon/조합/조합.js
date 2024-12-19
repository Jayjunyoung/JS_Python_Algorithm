const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
let result = 0;

function combination(n, m) {
  let numerator = BigInt(1); // 분자
  let denominator = BigInt(1); // 분모

  for (let i = 0; i < m; i++) {
    numerator *= BigInt(n - i);
    denominator *= BigInt(i + 1);
  }

  //BigInt 이기 때문에 toString()으로 해줘야함
  return (numerator / denominator).toString();
}

console.log(combination(n, m));
