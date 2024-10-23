function solution(friends, gifts) {
  let answer = 0;
  let dstData = {};

  // dstData 초기화 -> dstData는 2중 객체이다.
  friends.forEach((outerName) => {
    dstData[outerName] = {};
    friends.forEach((innerName) => {
      if (outerName !== innerName) {
        dstData[outerName][innerName] = [0, 0];
      } else {
        dstData[outerName][innerName] = 0;
      }
    });
  });

  // dstData 파싱
  gifts.forEach((gift) => {
    let [from, to] = gift.split(" ");
    dstData[from][from] += 1;
    dstData[to][to] -= 1;

    dstData[from][to][0] += 1;
    dstData[to][from][1] += 1;
  });

  // 각 친구별로 최댓값 계산
  Object.entries(dstData).forEach(([fromName, giftDatas]) => {
    let tempAnswer = 0;
    Object.entries(giftDatas).forEach(([toName, giftData]) => {
      if (fromName !== toName) {
        let [give, receive] = giftData;
        if (give > receive) {
          tempAnswer++;
        } else if (give === receive) {
          if (dstData[fromName][fromName] > dstData[toName][toName]) {
            tempAnswer++;
          }
        }
      }
    });
    answer = Math.max(answer, tempAnswer);
  });
  return answer;
}
