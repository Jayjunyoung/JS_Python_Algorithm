function solution(diffs, times, limit) {
  //문제 제한사항 보고 설정
  let max = 100000,
    min = 1,
    mid = 0;
  let answer = max;
  while (min <= max) {
    mid = Math.floor((max + min) / 2);
    let spendTime = 0,
      over = false;
    for (let i = 0; i < diffs.length; i++) {
      if (mid - diffs[i] < 0) {
        spendTime += (diffs[i] - mid) * (times[i] + times[i - 1]) + times[i];
      } else {
        spendTime += times[i];
      }

      if (limit < spendTime) {
        over = true;
        break;
      }
    }

    if (over) {
      min = mid + 1;
    } else {
      answer = mid;
      max = mid - 1;
    }
  }
  return answer;
}
