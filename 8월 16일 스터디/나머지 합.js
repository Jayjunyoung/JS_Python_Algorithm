const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

// 누적합 배열 생성
const prefix_sums = Array(N + 1).fill(0);
for (let i = 1; i <= N; i++) {
    prefix_sums[i] = prefix_sums[i - 1] + arr[i - 1];
}

// 나머지별 개수 저장
const remainderCount = new Map();
let answer = 0;

// 각 누적합의 나머지 계산
for (let i = 0; i <= N; i++) {
    const remainder = ((prefix_sums[i] % M) + M) % M; // 음수 처리
    
    if (remainderCount.has(remainder)) {
        remainderCount.set(remainder, remainderCount.get(remainder) + 1);
    } else {
        remainderCount.set(remainder, 1);
    }
}

// 같은 나머지를 가진 누적합들 중 2개를 선택하는 경우의 수
remainderCount.forEach((count) => {
    if (count >= 2) {
        answer += (count * (count - 1)) / 2;
    }
});

console.log(answer);