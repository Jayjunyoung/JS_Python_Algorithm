function solution(diffs, times, limit) {
  //문제 제한사항 보고 설정
  //max, min, mid 설정
  let max = 100000;
  let min = 1;
  let mid = 0;
  let answer = 0;

  //이분탐색 진행
  while (min <= max) {
    mid = Math.floor((min + max) / 2);
    let spendTime = 0,
      over = false;

    //숙련도에 따른 소요시간 구하기
    for (let i = 0; i < diffs.length; i++) {
      if (mid - diffs[i] < 0) {
        spendTime += (diffs[i] - mid) * (times[i] + times[i - 1]) + times[i];
      } else {
        spendTime += times[i];
      }

      //spendTime이 limit넘었는지 고려
      if (spendTime > limit) {
        over = true;
        break;
      }
    }

    //타임오바가됐는지에 따라 min, max값 조절
    if (over) {
      min = mid + 1;
    } else {
      answer = mid;
      max = mid - 1;
    }
  }

  return answer;
}
