function solution(friends, gifts) {
  let answer = 0;
  let dstData = new Map();

  // dstData 초기화 -> dstData는 2중 Map 구조이다.
  friends.forEach((outerName) => {
    dstData.set(outerName, new Map());
    friends.forEach((innerName) => {
      if (outerName !== innerName) {
        dstData.get(outerName).set(innerName, [0, 0]);
      } else {
        dstData.get(outerName).set(innerName, 0);
      }
    });
  });

  // dstData 파싱
  gifts.forEach((gift) => {
    let [from, to] = gift.split(" ");

    // 자기 자신에게 받은 선물 추가/감소
    dstData.get(from).set(from, dstData.get(from).get(from) + 1);
    dstData.get(to).set(to, dstData.get(to).get(to) - 1);

    // 선물 주고받은 횟수 기록
    dstData.get(from).get(to)[0] += 1;
    dstData.get(to).get(from)[1] += 1;
  });

  // 각 친구별로 최댓값 계산
  dstData.forEach((giftDatas, fromName) => {
    let tempAnswer = 0;
    giftDatas.forEach((giftData, toName) => {
      if (fromName !== toName) {
        let [give, receive] = giftData;
        if (give > receive) {
          tempAnswer += 1;
        } else if (give === receive) {
          if (
            dstData.get(fromName).get(fromName) >
            dstData.get(toName).get(toName)
          ) {
            tempAnswer += 1;
          }
        }
      }
    });
    answer = Math.max(answer, tempAnswer);
  });

  return answer;
}
