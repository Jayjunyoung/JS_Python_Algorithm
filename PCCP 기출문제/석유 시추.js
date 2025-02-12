function solution(land) {
  let answer = 0;

  const n = land.length;
  const m = land[0].length;

  // 1번 부터 시작해 만나는 석유 덩어리에 번호를 매긴다.
  let oil_index = 1;

  const visited = Array.from({ length: n }, () => Array(m).fill(0));

  //석유 덩어리 번호와 덩어리 사이즈를 알기위한 Map 자료구조
  const oilMap = new Map();

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  //붙어있는 석유들을 확인
  function bfs(initX, initY) {
    let oil = 0; //석유 갯수를 구하기위해 설정

    const queue = [{ x: initX, y: initY }];

    visited[initX][initY] = oil_index;

    while (queue.length) {
      const coord = queue.shift();
      let x = coord.x;
      let y = coord.y;

      if (land[x][y] === 1) {
        oil++;
      }

      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        if (nx < 0 || nx >= n || ny < 0 || ny >= m || visited[nx][ny]) continue;

        if (land[nx][ny] === 1) {
          visited[nx][ny] = oil_index;
          queue.push({ x: nx, y: ny });
        }
      }
    }
    oilMap[oil_index++] = oil;
    return oil;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (visited[i][j] === 0 && land[i][j] > 0) bfs(i, j);
    }
  }

  for (let i = 0; i < m; i++) {
    let sum = 0;
    const set = new Set();
    for (let j = 0; j < n; j++) {
      if (visited[j][i] !== 0) set.add(visited[j][i]);
    }
    set.forEach((item) => {
      sum += oilMap[item];
    });

    answer = sum > answer ? sum : answer;
  }
  return answer;
}
