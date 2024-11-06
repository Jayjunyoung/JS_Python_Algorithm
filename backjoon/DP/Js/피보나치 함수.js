const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const t = +input.shift();

for (let i = 0; i < t; i++) {
  const n = input[i];

  const fibonaci = [
    [1, 0],
    [0, 1],
  ];

  for (let j = 2; j <= n; j++) {
    fibonaci[j] = [
      fibonaci[j - 1][0] + fibonaci[j - 2][0],
      fibonaci[j - 1][1] + fibonaci[j - 2][1],
    ];
  }

  console.log(fibonaci[n].join(" "));
}
