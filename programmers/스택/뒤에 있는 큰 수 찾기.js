function solution(numbers) {
  var answer = new Array(numbers.length).fill(-1);
  var stack = [];
  for (var i = 0; i < numbers.length; i++) {
    while (stack && numbers[stack.at(-1)] < numbers[i]) {
      answer[stack.pop()] = numbers[i];
    }
    stack.push(i); //첨에 스택은 비어있으므로 stack에 0 추가
  }
  return answer;
}
