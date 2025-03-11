function solution(number, limit, power) {
  let res = 0;

  for (let i = 1; i <= number; i++) {
    let cnt = 0;

    for (let j = 1; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        if (i / j === j) cnt++;
        if (i / j !== j) cnt += 2;
      }

      if (cnt > limit) {
        cnt = power;
        //break 되면서 다음 기사로 넘어가자
        break;
      }
    }

    res += cnt;
  }

  return res;
}
