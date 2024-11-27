function solution(order) {
  //order: 택배 기사님이 원하는 상자 순서
  //반복문 1개만 사용(O(n))
  //order[0]을 1번째로 트럭에 담기
  let result = 0;
  const stack = []; //보조 컨테이너 벨트

  for (let i = 1; i <= order.length; i++) {
    stack.push(i);

    //i가 4일 때가 핵심
    //stack의 3이랑 result[1]이 동일하므로 stack.pop()하고 result 증가시키기
    while (stack.length !== 0 && stack.at(-1) === order[result]) {
      stack.pop();
      result++;
    }
  }

  return result;
}
