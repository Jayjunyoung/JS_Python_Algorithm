const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const numbers = input
  .shift()
  .split("-")
  .map((val) =>
    val
      .split("+")
      .map(Number)
      .reduce((a, b) => a + b, 0)
  );

const newValue = 2 * numbers[0] - numbers.reduce((a, b) => a + b, 0);

console.log(newValue);
