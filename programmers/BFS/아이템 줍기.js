function solution(rectangle, characterX, characterY, itemX, itemY) {
  characterX *= 2;
  characterY *= 2;
  itemX *= 2;
  itemY *= 2;
  let doubleRec = rectangle.map((rec) => rec.map((point) => point * 2));

  let direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  //0 : 시작거리니까 0으로 설정
  const start = [characterX, characterY, 0];
  let queue = [start];

  let range = Array.from({ length: 103 }, () => Array(103).fill(0));
  //테두리 이동을 위한 코드,
  doubleRec.forEach(([x1, y1, x2, y2]) => {
    for (let i = x1; i <= x2; i++) {
      for (let j = y1; j <= y2; j++) {
        if (i === x1 || i === x2 || j === y1 || j === y2) {
          if (range[i][j] === 0) range[i][j] = 1;
        } else {
          range[i][j] = 2;
        }
      }
    }
  });

  range[characterX][characterY] = 0;

  while (queue.length) {
    //이동거리를 queue의 한 요소로 설정
    let [x, y, cnt] = queue.shift();

    if (x === itemX && y === itemY) {
      return cnt / 2;
      //2배로 키웠으므로 리턴
    }

    for (let [dx, dy] of direction) {
      const nx = x + dx;
      const ny = y + dy;

      if (range[nx][ny] === 1) {
        queue.push([nx, ny, cnt + 1]);
        range[nx][ny] = 0;
        //방문처리를 의미
      }
    }
  }

  return 0;
}
