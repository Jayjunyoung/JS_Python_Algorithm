function solution(friends, gifts) {
  let answer = 0;
  let dstData = {};

  friends.forEach((outer) => {
    dstData[outer] = {};
    friends.forEach((inner) => {
      if (outer === inner) {
        dstData[outer][inner] = 0;
      } else {
        dstData[outer][inner] = [0, 0];
      }
    });
  });

  gifts.forEach((giftData) => {
    const [giveName, toName] = giftData.split(" ");
    dstData[giveName][giveName] += 1;
    dstData[toName][toName] -= 1;

    dstData[giveName][toName][0] += 1;
    dstData[toName][giveName][1] += 1;
  });

  Object.entries(dstData).forEach(([from, giftDatas]) => {
    let tempAnswer = 0;
    Object.entries(giftDatas).forEach(([to, giftData]) => {
      if (from !== to) {
        let [giveCount, toCount] = giftData;
        if (giveCount > toCount) tempAnswer++;
        else if (giveCount === toCount) {
          if (dstData[from][from] > dstData[to][to]) tempAnswer++;
        }
      }
    });
    answer = Math.max(answer, tempAnswer);
  });

  return answer;
}
