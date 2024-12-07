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
let possible = filteredInput.length; // 배울 수 있는 단어의 초기값
filteredInput.forEach((w) => {
  if (w.length <= leftover) {
    alpha = [...alpha, ...w]; //여기에는 r 두개가 들어가지만 이후 Set을 통해 중복 제거
    candidate.push(w); //w는 1차원 배열로 구성되어 있을 것 [[r], [r]]
  } else {
    possible--;
  }
});

// 중복 제거하여 배워야 할 알파벳 리스트 생성
alpha = [...new Set(alpha)];

// 배울 수 있는 알파벳이 충분한 경우 바로 결과 반환
if (alpha.length <= leftover) {
  console.log(possible);
  return;
}

// 비트마스크로 조합 탐색 2^alpha.length
// r 하나이므로 2^1 = 2
for (let i = 0; i < 1 << alpha.length; i++) {
  if (countBits(i) === leftover) {
    //index: 알파벳의 위치
    const learnedAlpha = alpha.filter((_, index) => i & (1 << index)); // 현재 배운 알파벳 조합
    let sum = 0;

    candidate.forEach((word) => {
      if (canLearn(word, learnedAlpha)) {
        sum++;
      }
    });

    answer = Math.max(answer, sum);
  }
}

console.log(answer);

// 비트마스크에서 1의 개수 세기
function countBits(n) {
  let count = 0;
  while (n > 0) {
    count += n & 1; //현재 가장 오른쪽의 비트가 1인지 확인 -> 13일 경우 1이 3개가 오른쪽 끝에 갈 것이므로 count는 3
    n >>= 1;
  }
  return count;
}

// 단어를 배울 수 있는지 확인
function canLearn(word, alpha) {
  for (let char of word) {
    if (!alpha.includes(char)) {
      return false;
    }
  }
  return true;
}
