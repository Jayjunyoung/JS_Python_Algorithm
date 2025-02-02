const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

// 첫 줄에는 친구의 수가 주어지지만, 사실 개수보다 각 친구의 요청이 중요합니다.
const n = Number(input.shift());

let quarter = 0,
  half = 0,
  threeQuarter = 0;

for (let i = 0; i < n; i++) {
  const slice = input[i].trim();
  if (slice === "1/4") {
    quarter++;
  } else if (slice === "1/2") {
    half++;
  } else if (slice === "3/4") {
    threeQuarter++;
  }
}

let result = 0;

// 1. 3/4 요청 처리: 각 3/4마다 한 판을 사용하고 남은 1/4를 채울 수 있음
// 젤 큰 3/4부터 처리하는게 베스트긴 하지
result += threeQuarter;
quarter = Math.max(0, quarter - threeQuarter);

// 2. 1/2 요청 처리: 두 개씩 짝지어 한 판, 홀수라면 한 판 추가 후 1/4 2개 채우기
result += Math.floor(half / 2);
if (half % 2 === 1) {
  result++; // 남은 1/2 하나 때문에 한 판 추가
  quarter = Math.max(0, quarter - 2); // 이 판은 나머지 1/4 2개까지 채울 수 있음
}

// 3. 남은 1/4 요청 처리: 4개씩 모이면 한 판
result += Math.ceil(quarter / 4);

// 4. 문제에서 최소 한 판은 주문해야 하므로
result = Math.max(result, 1);

console.log(result);
