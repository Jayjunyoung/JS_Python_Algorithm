function solution(want, number, discount) {
  let cnt = 0;
  //각 제품마다 할인된 갯수를 세는 배열
  let cntArray = Array(want.length).fill(0);

  const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  for (let i = 0; i < discount.length; i++) {
    let item = discount[i];

    if (want.includes(item)) {
      cntArray[want.indexOf(item)]++;
    }

    if (i >= 9) {
      //i가 10으로 되는 순간 i는 1부터 10까지 10개를 따지기 때문에 i가 0인 cntArray 갯수 감소
      if (want.includes(discount[i - 10])) {
        cntArray[want.indexOf(discount[i - 10])]--;
      }

      if (equals(number, cntArray)) cnt++;
    }
  }

  return cnt;
}
