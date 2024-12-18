function solution(orders, course) {
  const answer = [];

  for (const c of course) {
    const menu = [];

    for (const order of orders) {
      const orderArr = order.split("").sort(); //order를 사전순으로 정렬

      const comb = Combination(orderArr, c);

      menu.push(...comb);
    }

    const counter = {};

    for (const m of menu) {
      const key = m.join("");

      counter[key] = (counter[key] || 0) + 1;
    }

    const max = Math.max(...Object.values(counter));

    if (max > 1) {
      for (let [key, value] of Object.entries(counter)) {
        if (value === max) {
          answer.push(key);
        }
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
    const combine = combinations.map((v) => [select, ...v]);
    //combine = [['A', 'B'], ['A', 'C'], ['A', 'D']];
    result.push(...combine);
  });

  //2차원 배열 구조임 -> 이후에 m.join("")을 통해 배열이 합쳐질 것
  return result;
};
