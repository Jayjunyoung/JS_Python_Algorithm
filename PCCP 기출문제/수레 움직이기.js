function solution(maze) {
  const colLen = maze.length;
  const rowLen = maze[0].length;
  const pos = [null, null, null, null];
  const dest = [null, null, null, null];

  const redVisited = Array.from({ length: colLen }, () =>
    Array(rowLen).fill(false)
  );

  const blueVisited = Array.from({ length: colLen }, () =>
    Array(rowLen).fill(false)
  );

  const moves = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  //시작 좌표를 구한다음에 방문처리 해주자
  //방문처리는 빨간거 파란거 각각 해놔야해
  for (let i = 0; i < colLen; i++) {
    for (let j = 0; j < rowLen; j++) {
      if (maze[i][j] === 1) {
        pos[0] = i;
        pos[1] = j;
        redVisited[i][j] = true;
      } else if (maze[i][j] === 2) {
        pos[2] = i;
        pos[3] = j;
        blueVisited[i][j] = true;
      } else if (maze[i][j] === 3) {
        dest[0] = i;
        dest[1] = j;
      } else if (maze[i][j] === 4) {
        dest[2] = i;
        dest[3] = j;
      }
    }
  }

  const getValidMoves = (x, y, isRed) => {
    const visited = isRed ? redVisited : blueVisited;
    const validMoves = [];

    for (const [dx, dy] of moves) {
      const [nx, ny] = [x + dx, y + dy];

      if (
        nx >= 0 &&
        nx < colLen &&
        ny >= 0 &&
        ny < rowLen &&
        maze[nx][ny] !== 5 &&
        !visited[nx][ny]
      ) {
        validMoves.push([nx, ny]);
      }
    }

    return validMoves;
  };

  const recursive = ([rx, ry, bx, by], count) => {
    if (rx === dest[0] && ry === dest[1] && bx === dest[2] && by === dest[3]) {
      return count;
    }

    const redMove =
      rx === dest[0] && ry === dest[1]
        ? [[rx, ry]]
        : getValidMoves(rx, ry, true);

    const blueMove =
      bx === dest[2] && by === dest[3]
        ? [[bx, by]]
        : getValidMoves(bx, by, false);

    const min = [Infinity];

    for (const [rmx, rmy] of redMove) {
      for (const [bmx, bmy] of blueMove) {
        if (
          //자리교환 방지 + 같은 자리 방지
          !(rmx === bx && rmy === by && bmx === rx && bmy === ry) &&
          !(rmx === bmx && rmy === bmy)
        ) {
          redVisited[rmx][rmy] = true;
          blueVisited[bmx][bmy] = true;
          min.push(recursive([rmx, rmy, bmx, bmy], count + 1));
          redVisited[rmx][rmy] = false;
          blueVisited[bmx][bmy] = false;
        }
      }
    }

    return Math.min(...min);
  };

  const result = recursive(pos, 0);

  return result === Infinity ? 0 : result;
}
