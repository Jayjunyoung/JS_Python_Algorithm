function solution(points, routes) {
  let visitedPositions = new Map();

  // 로봇이 특정 위치와 시간에 있었는지 기록
  const recordRobotPosition = (row, col, time) => {
    const positionKey = `${row},${col},${time}`;
    if (visitedPositions.has(positionKey)) {
      visitedPositions.set(positionKey, visitedPositions.get(positionKey) + 1);
    } else {
      visitedPositions.set(positionKey, 1);
    }
  };

  // 로봇 이동 처리 함수
  const moveRobot = (
    startRow,
    startCol,
    endRow,
    endCol,
    currentTime,
    isFirstMove
  ) => {
    let time = currentTime;

    // 첫 번째 이동일 경우 출발 위치 기록
    if (!isFirstMove) {
      recordRobotPosition(startRow, startCol, time);
    }

    // 세로(행) 방향으로 이동
    if (startRow < endRow) {
      while (startRow < endRow) {
        time++;
        startRow++;
        recordRobotPosition(startRow, startCol, time);
      }
    } else {
      while (startRow > endRow) {
        time++;
        startRow--;
        recordRobotPosition(startRow, startCol, time);
      }
    }

    // 가로(열) 방향으로 이동
    if (startCol < endCol) {
      while (startCol < endCol) {
        time++;
        startCol++;
        recordRobotPosition(startRow, startCol, time);
      }
    } else {
      while (startCol > endCol) {
        time++;
        startCol--;
        recordRobotPosition(startRow, startCol, time);
      }
    }

    return time; // 최종 시간 반환
  };

  // 모든 로봇 경로 처리
  for (const route of routes) {
    let isFirstMove = false; // 첫 이동 여부
    let currentTime = 0; // 초기 시간 설정

    for (let i = 1; i < route.length; i++) {
      const startPointIndex = route[i - 1];
      const endPointIndex = route[i];
      const [startRow, startCol] = points[startPointIndex - 1];
      const [endRow, endCol] = points[endPointIndex - 1];

      currentTime = moveRobot(
        startRow,
        startCol,
        endRow,
        endCol,
        currentTime,
        isFirstMove
      );
      isFirstMove = true; // 첫 이동 이후로는 출발 위치를 다시 기록하지 않음
    }
  }

  // 충돌 개수 계산
  let collisionCount = 0;
  for (const [, robotCount] of visitedPositions) {
    if (robotCount > 1) {
      collisionCount++;
    }
  }

  return collisionCount;
}
