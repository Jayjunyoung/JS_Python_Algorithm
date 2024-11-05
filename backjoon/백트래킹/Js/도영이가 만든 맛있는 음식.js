const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
//신맛, 쓴맛 정보 2차원 배열로 구성
const data = input.map((v) => v.split(" ").map(Number));
let answer = Infinity;

for (let i = 1; i <= n; i++) {
  const result = [];
  const isUsed = [];

  const dfs = (depth) => {
    if (depth === i) {
      let multiply = 1;
      let sum = 0;
      result.forEach((el) => {
        const [a, b] = el;
        multiply *= a;
        sum += b;
      });

      answer = Math.min(answer, Math.abs(multiply - sum));
      return;
    }

    for (let j = 1; j <= n; j++) {
      if (!isUsed[j]) {
        result[depth] = data[j - 1];
        isUsed[j] = true;
        dfs(depth + 1);
        isUsed[j] = false;
      }
    }
  };

  dfs(0);
}

console.log(answer);
