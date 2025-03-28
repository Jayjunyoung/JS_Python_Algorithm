const { count } = require("console");
const { promisify } = require("util");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, k] = input.shift().split(" ").map(Number);
const words = ["a", "n", "t", "i", "c"];
const leftover = k - 5; // 'antic' 제외 후 배울 수 있는 알파벳 수
let alpha = []; //각 단어에서 배워야 할 알파벳 목록을 저장할 배열.
let candidate = []; //배울 수 있는 단어들의 리스트 저장
let answer = 0; //최종적으로 읽을 수 있는 단어의 최대 갯수

// 단어의 시작과 끝 제외 (중간 글자 추출)
const filteredInput = input.map((v) => {
  //안 보고 타이핑 해보기
  return [
    ...new Set(
      v
        .slice(4, v.length - 4)
        .split("")
        .filter((char) => !words.includes(char))
    ),
  ];
});

// 'antic'을 배울 수 없는 경우
if (leftover < 0) {
  console.log(0);
  return;
}

// 각 단어에 대해 필요한 알파벳 분석
let possible = filteredInput.length;
filteredInput.forEach((w) => {
  if (w.length <= leftover) {
    alpha = [...alpha, ...w];
    candidate.push(w); // 이때 candidate = [[r], [r]];
  } else {
    possible--;
  }
});
// 배울 수 있는 단어의 초기값

// 중복 제거하여 배워야 할 알파벳 리스트 생성
alpha = [...new Set(alpha)]; //alpha = ['r']

// 배울 수 있는 알파벳이 충분한 경우 바로 결과 반환
if (alpha.length <= leftover) {
  console.log(possible);
  return;
}

// 비트마스크로 조합 탐색 2^alpha.length
// alpha를 보면 r이 하나이므로 2^1 = 2
for (let i = 0; i < 1 << alpha.length; i++) {
  if (countBits(i) === leftover) {
    let learnedAlpha = alpha.filter((_, index) => i & (1 << index));
    let sum = 0;

    candidate.forEach((word) => {
      if (canMake(word, learnedAlpha)) {
        sum++;
      }
    });

    answer = Math.max(answer, sum);
  }
}

console.log(answer);

// 비트마스크에서 1의 개수를 세는 함수
function countBits(n) {
  let count = 0;
  while (n > 0) {
    //오른쪽으로 1칸 씩 움직이면서 끝에 1이 있을때마다 count 증가시키기
    count += n & 1;
    n >>= 1;
  }
  return count;
}

// 단어를 배울 수 있는지 확인
function canMake(word, learnedAlpha) {
  for (let char of word) {
    if (!learnedAlpha.includes(char)) {
      return false;
    }
  }
  return true;
}
