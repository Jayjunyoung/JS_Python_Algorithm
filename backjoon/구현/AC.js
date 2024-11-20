const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const t = +input.shift();
let answer = [];

for (let i = 0; i < t; i++) {
  //테스트케이스 들을 그룹화
  const func = input[i * 3].match(/(.)\1*/g);
  const n = +input[i * 3 + 1];
  let arr = JSON.parse(input[i * 3 + 2]);

  let revFlag = false;
  let startIndex = 0;
  let endIdx = arr.length;

  func.forEach((c) => {
    if (arr === "error") return;

    if (c[0] === "R") {
      //뒤집기 플래그를 토글
      //나머지가 1이면 홀수라는 소리네
      if (c.length % 2) revFlag = !revFlag;
    } else {
      //D 명령
      if (c.length > arr.length) return (arr = "error");

      revFlag ? (endIdx -= c.length) : (startIndex += c.length);

      //인덱스 엇갈리면 에러 처리
      if (startIndex > endIdx) arr = "error";
    }
  });

  if (arr !== "error") {
    arr = arr.slice(startIndex, endIdx);
    if (revFlag) arr.reverse();
    arr = JSON.stringify(arr);
  }

  answer.push(arr);
}

console.log(answer.join("\n"));
