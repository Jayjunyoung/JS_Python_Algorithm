function solution(clothes) {
  let clothMap = new Map();
  let answer = 1;

  clothes.forEach((v) => {
    const [clothName, clothContent] = v;

    if (clothMap.has(clothContent)) {
      clothMap.set(clothContent, clothMap.get(clothContent) + 1);
    } else {
      clothMap.set(clothContent, 1);
    }
  });

  //map의 값을 기반으로 이터러블 객체로 만든 뒤 접근
  for (let count of clothMap.values()) {
    answer *= count + 1;
  }

  return answer - 1;
}
