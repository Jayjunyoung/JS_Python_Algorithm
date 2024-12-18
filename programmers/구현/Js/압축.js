function solution(msg) {
  let answer = [];
  let nextWord = "";
  let lastCount = 27;

  const dir = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
    K: 11,
    L: 12,
    M: 13,
    N: 14,
    O: 15,
    P: 16,
    Q: 17,
    R: 18,
    S: 19,
    T: 20,
    U: 21,
    V: 22,
    W: 23,
    X: 24,
    Y: 25,
    Z: 26,
  };

  const s = msg.split("").reduce((acc, cur) => {
    nextWord = acc + cur;
    if (dir[nextWord] === undefined) {
      dir[nextWord] = lastCount++;
    } else {
      //ka를 반환하여 더 긴 시퀀스 탐색
      return acc + cur;
    }

    //ka중에서 k의 코드 11을 answer에 push
    if (dir[acc] !== undefined) answer.push(dir[acc]);

    //'a'부터 새로운 시퀀스 시작
    return cur;
  });

  //kakao의 o를 의미하므로 15가 push 됌
  answer.push(dir[s]);

  return answer;
}
