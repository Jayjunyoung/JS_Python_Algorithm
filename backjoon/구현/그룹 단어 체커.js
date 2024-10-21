const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
let countGroupWord = 0;

//n이 최대 100 이니까 2중 반복문도 무리없음
for (let i = 0; i < n; i++) {
  let word = input[i];
  //처음 등장한 문자를 넣는 배열
  const letter = [];
  let isGroupWord = true;

  for (let j = 0; j < word.length; j++) {
    if (letter.indexOf(word[j]) === -1) {
      letter.push(word[j]);
    } else {
      if (letter.indexOf(word[j]) !== letter.length - 1) {
        isGroupWord = false;
        break;
      }
    }
  }

  if (isGroupWord) {
    countGroupWord++;
  }
}

console.log(countGroupWord);
