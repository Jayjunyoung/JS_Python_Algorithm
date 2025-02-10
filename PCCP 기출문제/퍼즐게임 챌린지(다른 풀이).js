function solveSimulation(diffs, times, limit, level) {
  const n = diffs.length;
  let consumedTime = 0;

  for (let i = 0; i < n; i++) {
    const diff = diffs[i];
    const timeCur = times[i];
    const timePrev = i > 0 ? times[i - 1] : 0;

    if (level >= diff) {
      consumedTime += timeCur;
    } else {
      //퍼즐을 틀리는 경우
      //failedSolve : 틀린 횟수
      const failedSolve = diff - level;
      let solvedTime = timeCur * failedSolve;
      solvedTime += timePrev * failedSolve;
      solvedTime += timeCur;

      consumedTime += solvedTime;
    }

    if (consumedTime > limit) {
      return false;
    }
  }

  return true;
}

function solution(diffs, times, limit) {
  let low = 1;
  let high = Math.max(...diffs);

  while (low <= high) {
    const midLevel = Math.floor((low + high) / 2);
    //'나'의 숙련도를 넘겨줌
    const result = solveSimulation(diffs, times, limit, midLevel);

    if (result) {
      //시물레이션 결과가 성공이면 high보다 높은 건 전부 성공
      high = midLevel - 1;
    } else {
      low = midLevel + 1;
    }
  }

  return low;
}
