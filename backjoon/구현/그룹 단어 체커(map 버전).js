const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
let countGroupWord = 0;

for (let i = 0; i < n; i++) {
  let word = input[i];
  let isGroupWord = true;
  let prevChar = "";
  const seen = new Set();

  for (let j = 0; j < word.length; j++) {
    // 현재 문자가 직전 문자와 다르다면 중복 검사
    if (word[j] !== prevChar) {
      if (seen.has(word[j])) {
        isGroupWord = false;
        break;
      }
      seen.add(word[j]); // 새 문자를 기록
    }
    prevChar = word[j]; // 직전 문자 업데이트
  }

  if (isGroupWord) {
    countGroupWord++;
  }
}

console.log(countGroupWord); // 그룹 단어 개수 출력
