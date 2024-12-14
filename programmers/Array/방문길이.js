function solution(dirs) {
  let x = 0,
    y = 0; // 현재 위치 (0,0) 시작
  const direction = {
    U: [0, 1],
    D: [0, -1],
    R: [1, 0],
    L: [-1, 0],
  };

  let visitedEdges = new Set(); // 지나간 경로(간선)을 기록할 Set
  let answer = 0;

  for (let cmd of dirs) {
    let [dx, dy] = direction[cmd];

    let nx = x + dx;
    let ny = y + dy;

    if (nx < -5 || nx > 5 || ny < -5 || ny > 5) {
      continue;
    }

    const edge = [x, y, nx, ny].join(",");
    const reverseEdge = [nx, ny, x, y].join(",");

    if (!visitedEdges.has(edge) && !visitedEdges.has(reverseEdge)) {
      visitedEdges.add(edge);
      visitedEdges.add(reverseEdge);

      answer++;
    }

    x = nx;
    y = ny;
  }

  return answer;
}
