const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +input[0];

let answer = [];
// DFS 함수로 감소하는 수를 찾음
//depth : 자릿수를 의미
const dfs = (num, depth) => {
  answer.push(num);

  for (let i = 0; i < num % 10; i++) {
    dfs(num * 10 + i, depth + 1);
  }
};

// 0부터 9까지의 모든 숫자로 시작
for (let i = 0; i <= 9; i++) {
  dfs(i, 1);
}

// N이 감소하는 수의 개수보다 크면 -1 출력
answer.sort((a, b) => a - b);

//시작 인덱스가 0부터니까 마지막 인덱스는 19일거야
if (n >= answer.length) {
  console.log(-1);
} else {
  console.log(answer[n]);
}
