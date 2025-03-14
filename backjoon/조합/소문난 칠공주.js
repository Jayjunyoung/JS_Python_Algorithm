const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let map = input.map((row) => row.split(""));

let result = 0;

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// 25칸의 좌표를 미리 계산 후 positions 배열에 넣기
const positions = [];
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    positions.push([i, j]);
  }
}

// 7명의 학생을 선택 (조합) 여기부터 밑에까지가 문제의 핵심 코드

const getCombinations = (arr, selectedNumber) => {
  //selectedNumber가 1일때를 따져줘야함함
  if (selectedNumber === 1) return arr.map((v) => [v]);
  const combination = [];
  arr.forEach((fixed, index, origin) => {
    const reminder = origin.slice(index + 1);
    const subCombination = getCombinations(reminder, selectedNumber - 1);
    //attached = [
    //    ['A', 'B'], A랑 subCombination의 각 요소를 합 친 것
    //    ['A', 'C'],
    //    ['A', 'D']
    // ];
    const attached = subCombination.map((combination) => [
      fixed,
      ...combination,
    ]);

    combination.push(...attached);
  });

  return combination;
};

// BFS로 7개가 연결되어있는지 확인

const isConnected = (selected) => {
  const queue = [selected[0]];
  //7명이 있는 좌표를 방문처리 하기 위한 배열
  const visited = Array(selected.length).fill(false);
  visited[0] = true;
  let count = 1;

  while (queue.length > 0) {
    const [cx, cy] = queue.shift();

    for (let [dx, dy] of dir) {
      const nx = dx + cx;
      const ny = dy + cy;

      for (let i = 0; i < selected.length; i++) {
        if (!visited[i] && selected[i][0] === nx && selected[i][1] === ny) {
          //이동한 좌표들이 선택된 좌표들과 동일해야 queue에 넣어주는거지
          visited[i] = true;
          queue.push([nx, ny]);
          count++;
        }
      }
    }
  }

  return count === 7;
};

const combinations = getCombinations(positions, 7);

// 조합 생성 후 조건 검사
combinations.forEach((combination) => {
  let sCount = 0;

  combination.forEach(([x, y]) => {
    if (map[x][y] === "S") {
      sCount++;
    }
  });

  //문제 조건: 이다솜파는 4명 이상이어야 한다.
  //7개의 count로 연결 즉 7개가 선택되어있는지
  if (sCount >= 4 && isConnected(combination)) {
    result++;
  }
});

console.log(result);
