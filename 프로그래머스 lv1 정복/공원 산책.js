function solution(park, routes) {
  const h = park.length;
  const w = park[0].length;

  let start;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (park[i][j] === "S") start = [i, j];
    }
  }

  const directions = {
    E: [0, 1],
    W: [0, -1],
    S: [1, 0],
    N: [-1, 0],
  };

  for (let route of routes) {
    const [dir, directionLength] = route.split(" ");
    const intDirectionLength = parseInt(directionLength);

    let [nx, ny] = start;
    let step = 0;

    while (step < intDirectionLength) {
      nx += directions[dir][0];
      ny += directions[dir][1];

      if (nx < 0 || nx >= h || ny < 0 || ny >= w || park[nx][ny] === "X") {
        break;
      }
      step++;
    }

    if (step === intDirectionLength) {
      start = [nx, ny];
    }
  }

  return start;
}
