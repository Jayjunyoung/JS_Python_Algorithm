// Run by Node.js
const readline = require("readline");

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  for await (const line of rl) {
    const input = line.split("\n");

    const n = +input.shift();

    // 문제 풀이 로직 작성

    // 결과 출력
    console.log(n);

    // 입력 처리가 끝났다면 readline 닫기
    rl.close();
  }

  // 프로세스 종료
  process.exit();
})();
