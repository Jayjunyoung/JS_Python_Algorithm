const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

//이 문제는 투포인터로 접근했지만 답은 슬라이딩 윈도우로 접근해야함
//d일 연속된 범위 내에서 최대 선물 가치를 구해야 하기 때문에 "슬라이딩 윈도우" 방식을 적용해야 함

//참고 레퍼런스 : https://velog.io/@leeeeeyeon/%ED%88%AC-%ED%8F%AC%EC%9D%B8%ED%84%B0-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98%EA%B3%BC-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%94%A9-%EC%9C%88%EB%8F%84%EC%9A%B0-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98#%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%94%A9-%EC%9C%88%EB%8F%84%EC%9A%B0-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98
const [n, d] = input.shift().split(" ").map(Number);
const line = input.map((v) => v.split(" ").map(Number));
line.sort((a, b) => a[0] - b[0]); //이거 정렬 해줬어야함

let result = 0;

let start = 0;
let sum = 0;

for (let end = 0; end < n; end++) {
  sum += line[end][1];

  while (line[end][0] - line[start][0] >= d) {
    //기존 구간에 있던 만족도를 빼주기
    sum -= line[start][1];
    start++;
  }

  result = Math.max(result, sum);
}

console.log(result);
