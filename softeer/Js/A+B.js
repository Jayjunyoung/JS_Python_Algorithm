const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let sum = 0;
let arr = [];

rl.on("line", (input) => {
  sun = input.split(" ").reduce((acc, cur) => {
    return acc + parseInt(cur);
  }, 0);
  arr.push(sum);
});

rl.on("close", () => {
  const n = arr[0];
  arr.shift();

  for (let i = 0; i < n; i++) {
    console.log(`Case #${i + 1}: ${arr[i]}`);
  }
  process.exit();
});
