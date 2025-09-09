const input = require("fs").readFileSync("./dev/stdin").toString().trim().split("\n")

const n = +input.shift();

//2차원 배열
const position = input.map((v) => v.split(" ").map(Number));
position.sort((a,b) => a[0] - b[0])

let ans = 0;
ans += position[0][1] - position[0][0];
let cur = position[0][1]; // 초기 끝 점 설정

for(let i = 1; i < n; i++) {
    if(position[i][0] <= cur && position[i][1] > cur) {
        ans += position[i][1] - cur
        cur = position[i][1]
    } else if(position[i][0] > cur) {
        ans += position[i][1] - position[i][0];
        cur = position[i][1]
    }
}

console.log(ans);