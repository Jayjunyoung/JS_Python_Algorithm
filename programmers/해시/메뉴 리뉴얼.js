function solution(orders, course) {
  const answer = [];

  for (let i = 0; i < course.length; i++) {
    let max = 0;
    let hashMap = {};

    orders.forEach((order) => {
      Combination(order.split(""), course[i]).forEach((v) => {
        if (!hashMap[v]) hashMap[v] = 1;
        else hashMap[v] += 1;
      });

      for (const k in hashMap) {
        if (hashMap[k] > max) max = hashMap[k];
      }
    });

    for (const k in hashMap) {
      if (hashMap[k] === max && max > 1) {
        answer.push(k);
      }
    }
  }

  return answer.sort();
}

const Combination = (arr, num) => {
  const result = [];

  if (num === 1) {
    return arr.map((v) => [v]);
  }

  arr.forEach((select, index, origin) => {
    const reminder = origin.slice(index + 1); //origin: 원본 배열
    const combinations = Combination(reminder, num - 1);
    const combine = combinations.map((v) => [select, ...v].sort().join(""));
    result.push(...combine);
  });

  return result;
};
