const fs = require("fs");
const inputFile = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");

let n = +inputFile.shift();
array = inputFile[0].split(" ").map(Number);
solve(n, array);

function solve(n, array) {
  let min_dist = Infinity;
  let comb = [];

  for (let i = 0; i < array.length - 1; i++) {
    let dist = array[i + 1] - array[i];

    if (min_dist > dist) {
      min_dist = dist;
      comb = [[array[i], array[i + 1]]];
    } else if (min_dist === dist) {
      comb.push([[array[i], array[i + 1]]]);
    }
  }

  console.log(comb.length);
}
