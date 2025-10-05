function solution(friends, gifts) {
  let answer = 0;
  let dstData = {};

  // 초기화 구조 변경
  friends.forEach((name) => {
    dstData[name] = {
      giftScore: {
        // 선물 지수 관련 데이터
        given: 0, // 준 선물 수
        received: 0, // 받은 선물 수
      },
      exchanges: {}, // 다른 사람과 주고받은 기록
    };

    // 교환 기록 초기화
    friends.forEach((other) => {
      if (name !== other) {
        dstData[name].exchanges[other] = [0, 0]; // [준 선물, 받은 선물]
      }
    });
  });

  // 선물 기록 처리
  gifts.forEach((giftData) => {
    const [giveName, toName] = giftData.split(" ");

    // 선물 지수 계산용 데이터 추가
    dstData[giveName].giftScore.given++; // 준 선물 +1
    dstData[toName].giftScore.received++; // 받은 선물 +1

    // 교환 기록
    dstData[giveName].exchanges[toName][0]++; // 준 선물
    dstData[toName].exchanges[giveName][1]++; // 받은 선물
  });

  // 다음 달 선물 계산
  Object.entries(dstData).forEach(([from, data]) => {
    let tempAnswer = 0;
    Object.entries(data.exchanges).forEach(([to, [given, received]]) => {
      if (given > received) {
        tempAnswer++;
      } else if (given === received) {
        // 선물 지수 계산 및 비교
        const fromScore = data.giftScore.given - data.giftScore.received;
        const toScore =
          dstData[to].giftScore.given - dstData[to].giftScore.received;
        if (fromScore > toScore) tempAnswer++;
      }
    });
    answer = Math.max(answer, tempAnswer);
  });

  return answer;
}
