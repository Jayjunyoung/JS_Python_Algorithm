function solution(clothes) {
  let combiClothes = {};
  let answer = 1;
  clothes.forEach((cloth, index) => {
    const [name, type] = cloth;

    if (combiClothes.hasOwnProperty(type)) {
      combiClothes[type] += 1;
    } else {
      combiClothes[type] = 1;
    }
  });

  //반복문 사용 할 거고
  for (let item in combiClothes) {
    //해당 옷 종류를 안 입는거까지 계산
    answer *= combiClothes[item] + 1;
  }

  //아예 안 입는 경우 - 1 해줘야돼
  return answer - 1;
}
