const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m, r] = input.shift().split(" ").map(Number);

let map = input.slice(0, n).map((v) => v.split(" ").map(Number));

const operations = input[n].split(" ").map(Number);

function one(arr) {
  return arr.reverse();
}

function two(arr) {
  //행을 반전하면 결국 좌/우 반전을 의미
  return arr.map((row) => row.reverse());
}

//오른쪽으로 90도 회전 -> 여기가 좀 어렵네
function three(arr) {
  const n = arr.length;
  const m = arr[0].length;

  const result = Array.from(Array(m), () => Array(n));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      result[j][n - 1 - i] = arr[i][j];
    }
  }

  return result;
}

function four(arr) {
  const n = arr.length;
  const m = arr[0].length;
  const result = Array.from(Array(m), () => Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      result[m - 1 - j][i] = arr[i][j];
    }
  }
  return result;
}

function five(arr) {
  const n = arr.length;
  const m = arr[0].length;
  const halfN = Math.floor(n / 2);
  const halfM = Math.floor(m / 2);
  const result = Array.from(Array(n), () => Array(m));

  // 1 -> 2
  // 같은 행에 있고 열이 바뀐다..!
  // 그림을 그려보면 돼
  for (let i = 0; i < halfN; i++) {
    for (let j = 0; j < halfM; j++) {
      result[i][j + halfM] = arr[i][j];
    }
  }
  // 2 -> 3
  for (let i = 0; i < halfN; i++) {
    for (let j = halfM; j < m; j++) {
      result[i + halfN][j] = arr[i][j];
    }
  }
  // 3 -> 4
  for (let i = halfN; i < n; i++) {
    for (let j = halfM; j < m; j++) {
      result[i][j - halfM] = arr[i][j];
    }
  }
  // 4 -> 1
  for (let i = halfN; i < n; i++) {
    for (let j = 0; j < halfM; j++) {
      result[i - halfN][j] = arr[i][j];
    }
  }
  return result;
}

function six(arr) {
  const n = arr.length;
  const m = arr[0].length;
  const halfN = Math.floor(n / 2);
  const halfM = Math.floor(m / 2);
  //각 배열의 요소 값은 undefined임
  //만약 n이 3, m이 4라면
  //2차원 배열에 각각 행이 undefined이고 4개씩 존재
  const result = Array.from(Array(n), () => Array(m));

  // 1 -> 4
  for (let i = 0; i < halfN; i++) {
    for (let j = 0; j < halfM; j++) {
      result[i + halfN][j] = arr[i][j];
    }
  }
  // 4 -> 3
  for (let i = halfN; i < n; i++) {
    for (let j = 0; j < halfM; j++) {
      result[i][j + halfM] = arr[i][j];
    }
  }
  // 3 -> 2
  for (let i = halfN; i < n; i++) {
    for (let j = halfM; j < m; j++) {
      result[i - halfN][j] = arr[i][j];
    }
  }
  // 2 -> 1
  for (let i = 0; i < halfN; i++) {
    for (let j = halfM; j < m; j++) {
      result[i][j - halfM] = arr[i][j];
    }
  }
  return result;
}

operations.forEach((op) => {
  if (op === 1) map = one(map);
  else if (op === 2) map = two(map);
  else if (op === 3) map = three(map);
  else if (op === 4) map = four(map);
  else if (op === 5) map = five(map);
  else if (op === 6) map = six(map);
});

console.log(map.map((row) => row.join(" ")).join("\n"));
