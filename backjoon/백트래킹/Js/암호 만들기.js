const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [L, C] = input.shift().split(" ").map(Number);

const alphabets = input[0].split(" ").sort();
const vowel = ["a", "e", "i", "o", "u"];
const answer = [];

const dfs = (alphabet, startIndex) => {
  if (alphabet.length === L) {
    //cnt 설정 이유 : 모음의 갯수 세기
    let cnt = 0;
    for (let i = 0; i < alphabet.length; i++) {
      if (vowel.includes(alphabet[i])) cnt++;
    }
    if (cnt > 0 && L - cnt > 1) {
      answer.push(alphabet);
    }
  } else {
    for (let i = startIndex; i < C; i++) {
      dfs(alphabet + alphabets[i], i + 1);
    }
  }
};

dfs("", 0);
console.log(answer.join("\n"));
