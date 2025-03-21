function isValidMove(nx, ny) {
  return nx >= -5 && nx <= 5 && ny >= -5 && ny <= 5;
}

function updateLocation(x, y, dir) {
  switch (dir) {
    case "U":
      return [x, y + 1];

    case "D":
      return [x, y - 1];

    case "R":
      return [x + 1, y];

    case "L":
      return [x - 1, y];
  }
}

function solution(dirs) {
  let x = 0;
  let y = 0;

  let visited = new Set();

  for (let dir of dirs) {
    const [nx, ny] = updateLocation(x, y, dir);

    if (!isValidMove(nx, ny)) {
      continue;
    }

    visited.add(`${x}${y}${nx}${ny}`);
    visited.add(`${nx}${ny}${x}${y}`);

    [x, y] = [nx, ny];
  }

  //중복이 없는 고유한 경로의 갯수를 구할려면 나누기 2
  return visited.size / 2;
}
