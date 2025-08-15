const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 아이들의 수
const n = +input.shift()

const line = input.map((v) => Number(v));
const longest = Array(n).fill(1);

for(let i = 1; i < n; i++) {
    let cnt = 0;
    for(let j = 0; j < i; j++) {
        if(line[j] < line[i]) {
            cnt = Math.max(cnt, longest[j]);
        }
    }
    longest[i] = cnt + 1;
}

console.log(n - Math.max(...longest));