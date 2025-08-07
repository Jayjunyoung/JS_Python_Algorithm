function solution(n) {
  const cnt1 = n
    .toString(2)
    .split("")
    .filter((v) => v === "1").length;
  let cnt2 = 0;
  // num 변수에 현재 숫자 기입
  let num = n;
  while (true) {
    //break 통해서 반복문 탈출하도록
    num++;
    cnt2 = num
      .toString(2)
      .split("")
      .filter((v) => v === "1").length;
    if (cnt2 === cnt1) break;
  }
  return num;
}
