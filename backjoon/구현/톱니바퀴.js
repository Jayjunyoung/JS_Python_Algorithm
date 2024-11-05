const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const A = input.shift();
const B = input.shift();
const C = input.shift();
const D = input.shift();

// 각 톱니의 12시방향 인덱스
let a = 0;
let b = 0;
let c = 0;
let d = 0;

function rotate(t, r) {
  // r이 1이면 시계방향으로 회전이니까  각 톱니의 12시 방향 인덱스에서 -1 해줘야함.
  // 예) 0인 상태에서 시계방향으로 돌면 7 그니까 -1 해줘야함.
  t += -r;
  if (t === 8) {
    t = 0;
  } else if (t === -1) {
    t = 7;
  }

  return t;
}

input.shift();
input
  .map((v) => v.split(" ").map(Number))
  .forEach(([t, r]) => {
    const AB = A[(a + 2) % 8] != B[(b + 6) % 8];
    const BC = B[(b + 2) % 8] != C[(c + 6) % 8];
    const CD = C[(c + 2) % 8] != D[(d + 6) % 8];

    //switch부분에서 cas2 2:, case 3: 부분을 다시 타이핑 해보자
    switch (t) {
      case 1:
        a = rotate(a, r);
        if (AB) {
          b = rotate(b, -r);
          if (BC) {
            c = rotate(c, r);
            if (CD) {
              d = rotate(d, -r);
            }
          }
        }
        break;
      case 2:
        b = rotate(b, r);
        if (AB) {
          a = rotate(a, -r);
        }

        if (BC) {
          c = rotate(c, -r);
          if (CD) {
            d = rotate(d, r);
          }
        }

        break;
      case 3:
        c = rotate(c, r);
        if (CD) {
          d = rotate(d, -r);
        }

        if (BC) {
          b = rotate(b, -r);
          if (AB) {
            a = rotate(a, r);
          }
        }
        break;
      case 4:
        d = rotate(d, r);
        if (CD) {
          c = rotate(c, -r);
          if (BC) {
            b = rotate(b, r);
            if (AB) {
              a = rotate(a, -r);
            }
          }
        }

        break;
    }
  });

let answer = 0;

//S극 일 때를 따져줘야해
if (A[a] == "1") {
  answer += 1;
}

if (B[b] == "1") {
  answer += 2;
}

if (C[c] == "1") {
  answer += 4;
}

if (D[d] == "1") {
  answer += 8;
}

console.log(answer);
