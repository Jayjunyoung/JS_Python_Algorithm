function solution(s) {
  let answer = "";
  //최종 누적된 상태의 값이 될것
  const numberAlphabet = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  let tempWord = ""; // 영단어를 누적해서 확인할 변수

  for (let char of s) {
    // 숫자인 경우 바로 추가
    if (!isNaN(char)) {
      answer += char;
    } else {
      // 영단어일 가능성이 있는 경우
      tempWord += char;
      if (numberAlphabet[tempWord] !== undefined) {
        answer += numberAlphabet[tempWord]; // 영단어를 숫자로 변환
        tempWord = ""; // 변환 후 초기화
        //초기화 안하면 one을 처리한 뒤에 seven을 처리할 때 one이 남아있기 때문에 에러 발생
      }
    }
  }

  return Number(answer); // 숫자로 변환
}
