function solution(s) {
  let answer = 0;
  //회전하더라도 올바른 괄호 문자열 못 만드는 경우는 0을 출력
  let stack = [];
  let isCorrect = true;

  //주어진 문자열이 홀수인 경우에는 0으로 return
  if (s.length % 2 === 1) return 0;

  for (let i = 0; i < s.length; i++) {
    let str = s.slice(i) + s.slice(0, i);
    //회전된 문자열을 검사하기 전에 true로 세팅
    isCorrect = true;

    for (let n of str) {
      if (n === "[" || n === "{" || n === "(") {
        stack.push(n);
      } else {
        let opening = stack.pop();
        //짝이 맞으면 continue
        if (opening === "(" && n === ")") continue;
        if (opening === "{" && n === "}") continue;
        if (opening === "[" && n === "]") continue;
        //짝이 맞지 않으면 실패이므로 isCorrect를 false로 초기화
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) answer++;
  }
  return answer;
}
